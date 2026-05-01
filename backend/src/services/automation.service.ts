import { Role, type AutomationRule, type Prisma } from "@prisma/client";
import { CronExpressionParser } from "cron-parser";
import cron from "node-cron";
import { env } from "../config/env";
import { prisma } from "../lib/prisma";
import { emitSystemEvent } from "../lib/realtime";
import { AppError } from "../utils/errors";
import { createAuditLog } from "./audit.service";
import { evaluateStudentBadges } from "./badge.service";
import { createNotification, createNotificationsForRole } from "./notification.service";

type TriggerConfig = {
  type: string;
  schedule?: string;
  metric?: string;
  operator?: "gte" | "lte" | "gt" | "lt" | "eq";
  value?: number;
  frequencyMinutes?: number;
};

type ActionConfig = {
  type: string;
  target?: string;
  template?: string;
  title?: string;
  titleThai?: string;
  message?: string;
  messageThai?: string;
  priority?: string;
  badge?: {
    name: string;
    nameThai: string;
    description: string;
    icon: string;
    criteria: string;
  };
};

let intervalHandle: NodeJS.Timeout | null = null;

const parseTrigger = (value: Prisma.JsonValue): TriggerConfig => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new AppError(400, "Automation trigger must be an object");
  }

  return value as unknown as TriggerConfig;
};

const parseAction = (value: Prisma.JsonValue): ActionConfig => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new AppError(400, "Automation action must be an object");
  }

  return value as unknown as ActionConfig;
};

export const computeNextAutomationRun = (
  triggerInput: Prisma.JsonValue,
  from = new Date(),
) => {
  const trigger = parseTrigger(triggerInput);

  if (trigger.schedule) {
    if (!cron.validate(trigger.schedule)) {
      throw new AppError(400, "Invalid cron schedule");
    }

    return CronExpressionParser.parse(trigger.schedule, {
      currentDate: from,
    })
      .next()
      .toDate();
  }

  const frequencyMinutes = Math.max(1, trigger.frequencyMinutes ?? 60);
  return new Date(from.getTime() + frequencyMinutes * 60 * 1000);
};

const toRole = (value?: string) => {
  if (!value) {
    return null;
  }

  const upper = value.toUpperCase();
  return Object.values(Role).includes(upper as Role) ? (upper as Role) : null;
};

const metricMatches = (
  actual: number,
  operator: TriggerConfig["operator"],
  expected: number,
) => {
  switch (operator) {
    case "lt":
      return actual < expected;
    case "lte":
      return actual <= expected;
    case "gt":
      return actual > expected;
    case "eq":
      return actual === expected;
    case "gte":
    default:
      return actual >= expected;
  }
};

const getStudentMetricValue = (
  metric: string,
  student: {
    xp: number;
    coins: number;
    totalActivityHours: number;
    gamificationPoints: number;
    internship: { logs: Array<{ hours: number }> } | null;
  },
) => {
  switch (metric) {
    case "xp":
      return student.xp;
    case "coins":
      return student.coins;
    case "gamificationPoints":
      return student.gamificationPoints;
    case "activityHours":
      return student.totalActivityHours;
    case "internshipHours":
      return student.internship?.logs.reduce((sum, log) => sum + log.hours, 0) ?? 0;
    default:
      throw new AppError(400, `Unsupported automation metric: ${metric}`);
  }
};

const runNotificationTemplate = async (rule: AutomationRule, action: ActionConfig) => {
  if (action.template === "pending-request-digest") {
    const pendingCount = await prisma.request.count({
      where: { status: "pending" },
    });

    if (pendingCount === 0) {
      return 0;
    }

    const role = toRole(action.target) ?? Role.STAFF;
    const created = await createNotificationsForRole(role, {
      title: action.title ?? "Pending student requests",
      titleThai: action.titleThai ?? "มีคำร้องนักศึกษารอดำเนินการ",
      message:
        action.message ??
        `There are ${pendingCount} pending student requests waiting for review.`,
      messageThai:
        action.messageThai ?? `มีคำร้องนักศึกษารอดำเนินการ ${pendingCount} รายการ`,
      type: "info",
      priority: action.priority ?? "medium",
      channels: ["in-app"],
      actionUrl: "/requests",
      actionLabel: "Open requests",
    });

    return created.length;
  }

  const role = toRole(action.target);
  if (role) {
    const created = await createNotificationsForRole(role, {
      title: action.title ?? rule.name,
      titleThai: action.titleThai,
      message: action.message ?? rule.description,
      messageThai: action.messageThai,
      type: "info",
      priority: action.priority ?? "medium",
      channels: ["in-app"],
    });
    return created.length;
  }

  return 0;
};

const runStudentMetricRule = async (rule: AutomationRule, action: ActionConfig, trigger: TriggerConfig) => {
  if (!trigger.metric || typeof trigger.value !== "number") {
    throw new AppError(400, "Metric-based automation rules require metric and value");
  }

  const students = await prisma.studentProfile.findMany({
    include: {
      internship: {
        include: {
          logs: true,
        },
      },
    },
  });

  let affected = 0;

  for (const student of students) {
    const actual = getStudentMetricValue(trigger.metric, student);
    if (!metricMatches(actual, trigger.operator, trigger.value)) {
      continue;
    }

    if (action.type === "award_badge" && action.badge) {
      const badge = await prisma.badge.upsert({
        where: {
          studentId_name: {
            studentId: student.id,
            name: action.badge.name,
          },
        },
        update: {},
        create: {
          studentId: student.id,
          name: action.badge.name,
          nameThai: action.badge.nameThai,
          description: action.badge.description,
          icon: action.badge.icon,
          criteria: action.badge.criteria,
        },
      });

      affected += badge ? 1 : 0;

      await createNotification({
        userId: student.userId,
        title: "New badge awarded",
        titleThai: "คุณได้รับ badge ใหม่",
        message: `You received the "${action.badge.name}" badge.`,
        messageThai: `คุณได้รับ badge "${action.badge.nameThai}"`,
        type: "success",
        priority: "medium",
        channels: ["in-app"],
        actionUrl: "/activities",
        actionLabel: "View badges",
      });
    }

    if (action.type === "badge_evaluation") {
      const newBadges = await evaluateStudentBadges(student.id);
      affected += newBadges.length;
    }
  }

  return affected;
};

const executeAutomationRule = async (rule: AutomationRule) => {
  const trigger = parseTrigger(rule.trigger as Prisma.JsonValue);
  const action = parseAction(rule.action as Prisma.JsonValue);

  if (trigger.type === "student_metric") {
    return runStudentMetricRule(rule, action, trigger);
  }

  if (action.type === "notification") {
    return runNotificationTemplate(rule, action);
  }

  if (action.type === "badge_evaluation") {
    const students = await prisma.studentProfile.findMany({
      select: { id: true },
    });
    let affected = 0;

    for (const student of students) {
      const awarded = await evaluateStudentBadges(student.id);
      affected += awarded.length;
    }

    return affected;
  }

  throw new AppError(400, `Unsupported automation action type: ${action.type}`);
};

export const runAutomationRuleById = async (ruleId: string) => {
  const rule = await prisma.automationRule.findUnique({
    where: { id: ruleId },
    include: {
      admin: true,
    },
  });

  if (!rule) {
    throw new AppError(404, "Automation rule not found");
  }

  const affected = await executeAutomationRule(rule);
  const nextRun = computeNextAutomationRun(rule.trigger as Prisma.JsonValue, new Date());

  await prisma.automationRule.update({
    where: { id: rule.id },
    data: {
      lastRun: new Date(),
      nextRun,
      executionCount: { increment: 1 },
    },
  });

  await createAuditLog({
    userId: rule.admin.userId,
    action: "AUTOMATION_RULE_EXECUTED",
    resource: "AutomationRule",
    resourceId: rule.id,
    changes: {
      affected,
      nextRun: nextRun.toISOString(),
    },
  });

  emitSystemEvent("automation:executed", {
    ruleId: rule.id,
    name: rule.name,
    affected,
    executedAt: new Date().toISOString(),
  });

  return {
    ruleId: rule.id,
    affected,
    nextRun,
  };
};

export const processDueAutomationRules = async () => {
  const now = new Date();
  const rules = await prisma.automationRule.findMany({
    where: {
      isActive: true,
      OR: [{ nextRun: null }, { nextRun: { lte: now } }],
    },
  });

  const results = [];
  for (const rule of rules) {
    results.push(await runAutomationRuleById(rule.id));
  }

  return results;
};

export const startAutomationProcessor = () => {
  if (intervalHandle) {
    return intervalHandle;
  }

  intervalHandle = setInterval(() => {
    void processDueAutomationRules().catch((error) => {
      console.error("Automation processor failed", error);
    });
  }, env.AUTOMATION_POLL_SECONDS * 1000);

  return intervalHandle;
};

export const stopAutomationProcessor = () => {
  if (!intervalHandle) {
    return;
  }

  clearInterval(intervalHandle);
  intervalHandle = null;
};
