import { Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../lib/passport";
import { prisma } from "../lib/prisma";
import { checkRole } from "../middleware/check-role";
import { validate } from "../middleware/validate";
import { acceptQuest, completeQuestTask, getPlayerStats } from "../services/quest.service";
import { getStudentProfileByUserId } from "../services/profile.service";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/errors";
import { requireUser } from "../utils/user";

const router = Router();

const questQuerySchema = z.object({
  type: z.string().optional(),
  category: z.string().optional(),
  difficulty: z.string().optional(),
});

const questCreateSchema = z.object({
  title: z.string().min(1),
  titleEn: z.string().min(1),
  description: z.string().min(1),
  descriptionEn: z.string().min(1),
  type: z.string().min(1),
  difficulty: z.string().min(1),
  category: z.string().min(1),
  xp: z.coerce.number().int().nonnegative(),
  coins: z.coerce.number().int().nonnegative(),
  deadline: z.coerce.date(),
  assignerType: z.string().min(1),
  tasks: z.array(
    z.object({
      title: z.string().min(1),
      titleEn: z.string().min(1),
      sortOrder: z.coerce.number().int().nonnegative().optional(),
    }),
  ),
});

const acceptQuestSchema = z.object({
  questId: z.string().min(1),
});

const completeQuestTaskSchema = z.object({
  questId: z.string().min(1),
  taskId: z.string().min(1),
});

router.get(
  "/quests",
  validate(questQuerySchema, "query"),
  asyncHandler(async (req, res) => {
    const quests = await prisma.quest.findMany({
      where: {
        ...(req.query.type ? { type: String(req.query.type) } : {}),
        ...(req.query.category ? { category: String(req.query.category) } : {}),
        ...(req.query.difficulty ? { difficulty: String(req.query.difficulty) } : {}),
      },
      include: {
        tasks: true,
        enrollments: {
          include: {
            student: { include: { user: true } },
          },
        },
      },
      orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
    });

    res.json({
      success: true,
      quests,
    });
  }),
);

router.post(
  "/quests",
  requireAuth,
  checkRole([Role.LECTURER, Role.COMPANY, Role.ADMIN]),
  validate(questCreateSchema),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);

    const quest = await prisma.quest.create({
      data: {
        title: req.body.title,
        titleEn: req.body.titleEn,
        description: req.body.description,
        descriptionEn: req.body.descriptionEn,
        type: req.body.type,
        difficulty: req.body.difficulty,
        category: req.body.category,
        xp: req.body.xp,
        coins: req.body.coins,
        deadline: req.body.deadline,
        assignerId: currentUser.id,
        assignerType: req.body.assignerType,
        tasks: {
          create: req.body.tasks.map((task: { title: string; titleEn: string; sortOrder?: number }) => ({
            title: task.title,
            titleEn: task.titleEn,
            sortOrder: task.sortOrder ?? 0,
          })),
        },
      },
      include: {
        tasks: true,
      },
    });

    res.status(201).json({
      success: true,
      quest,
    });
  }),
);

router.get(
  "/quests/:id",
  asyncHandler(async (req, res) => {
    const questId = String(req.params.id);
    const quest = await prisma.quest.findUnique({
      where: { id: questId },
      include: {
        tasks: true,
        enrollments: {
          include: {
            student: { include: { user: true } },
          },
        },
      },
    });

    if (!quest) {
      throw new AppError(404, "Quest not found");
    }

    res.json({
      success: true,
      quest,
    });
  }),
);

router.post(
  "/quests/accept",
  requireAuth,
  checkRole([Role.STUDENT]),
  validate(acceptQuestSchema),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const student = await getStudentProfileByUserId(currentUser.id);

    const enrollment = await acceptQuest(req.body.questId, student.id);
    res.status(201).json({
      success: true,
      enrollment,
    });
  }),
);

router.patch(
  "/quests/task/complete",
  requireAuth,
  checkRole([Role.STUDENT]),
  validate(completeQuestTaskSchema),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const student = await getStudentProfileByUserId(currentUser.id);

    const enrollment = await completeQuestTask(req.body.questId, req.body.taskId, student.id);
    res.json({
      success: true,
      enrollment,
    });
  }),
);

router.get(
  "/player/stats",
  requireAuth,
  checkRole([Role.STUDENT]),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const student = await getStudentProfileByUserId(currentUser.id);

    res.json({
      success: true,
      stats: await getPlayerStats(student.id),
    });
  }),
);

export const questsRoutes = router;
