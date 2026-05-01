import { prisma } from "../lib/prisma";
import { AppError } from "../utils/errors";
import { evaluateStudentBadges } from "./badge.service";

export const acceptQuest = async (questId: string, studentId: string) => {
  const quest = await prisma.quest.findUnique({
    where: { id: questId },
    include: { tasks: true },
  });

  if (!quest) {
    throw new AppError(404, "Quest not found");
  }

  return prisma.questEnrollment.upsert({
    where: {
      questId_studentId: {
        questId,
        studentId,
      },
    },
    update: {},
    create: {
      questId,
      studentId,
      progress: 0,
      completedTasks: [],
    },
    include: {
      quest: { include: { tasks: true } },
      student: { include: { user: true } },
    },
  });
};

export const completeQuestTask = async (
  questId: string,
  taskId: string,
  studentId: string,
) => {
  const enrollment = await prisma.questEnrollment.findUnique({
    where: {
      questId_studentId: {
        questId,
        studentId,
      },
    },
    include: {
      quest: { include: { tasks: true } },
      student: true,
    },
  });

  if (!enrollment) {
    throw new AppError(404, "Quest enrollment not found");
  }

  const taskExists = enrollment.quest.tasks.some((task) => task.id === taskId);
  if (!taskExists) {
    throw new AppError(400, "Quest task does not belong to this quest");
  }

  const nextCompletedTasks = Array.from(new Set([...enrollment.completedTasks, taskId]));
  const totalTasks = enrollment.quest.tasks.length || 1;
  const progress = Math.round((nextCompletedTasks.length / totalTasks) * 100);
  const hasCompletedQuest = nextCompletedTasks.length === totalTasks;

  await prisma.$transaction(async (tx) => {
    await tx.questEnrollment.update({
      where: { id: enrollment.id },
      data: {
        completedTasks: nextCompletedTasks,
        progress,
        status: hasCompletedQuest ? "completed" : "in-progress",
        completedAt: hasCompletedQuest ? new Date() : null,
        rewardGranted: hasCompletedQuest ? true : enrollment.rewardGranted,
      },
    });

    if (hasCompletedQuest && !enrollment.rewardGranted) {
      await tx.studentProfile.update({
        where: { id: studentId },
        data: {
          xp: { increment: enrollment.quest.xp },
          coins: { increment: enrollment.quest.coins },
        },
      });

      await tx.timelineEvent.create({
        data: {
          studentId,
          type: "achievement",
          title: `Completed quest: ${enrollment.quest.title}`,
          titleThai: `ทำเควสต์สำเร็จ: ${enrollment.quest.title}`,
          description: `ได้รับ ${enrollment.quest.xp} XP และ ${enrollment.quest.coins} coins`,
          semester: 1,
          academicYear: new Date().getFullYear().toString(),
          relatedId: enrollment.questId,
          relatedType: "quest",
          isImportant: true,
          tags: ["quest", "achievement"],
          metadata: {
            xp: enrollment.quest.xp,
            coins: enrollment.quest.coins,
          },
        },
      });
    }
  });

  await evaluateStudentBadges(studentId);

  return prisma.questEnrollment.findUnique({
    where: {
      questId_studentId: {
        questId,
        studentId,
      },
    },
    include: {
      quest: { include: { tasks: true } },
      student: { include: { user: true } },
    },
  });
};

export const getPlayerStats = async (studentId: string) => {
  const student = await prisma.studentProfile.findUnique({
    where: { id: studentId },
    include: {
      badges: true,
      questEnrollments: {
        include: { quest: true },
      },
    },
  });

  if (!student) {
    throw new AppError(404, "Student profile not found");
  }

  return {
    xp: student.xp,
    coins: student.coins,
    gamificationPoints: student.gamificationPoints,
    level: Math.max(1, Math.floor(student.xp / 100) + 1),
    badges: student.badges,
    quests: student.questEnrollments,
  };
};
