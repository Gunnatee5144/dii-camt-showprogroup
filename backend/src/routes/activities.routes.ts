import { Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../lib/passport";
import { prisma } from "../lib/prisma";
import { checkRole } from "../middleware/check-role";
import { validate } from "../middleware/validate";
import { checkInToActivity, grantActivityReward } from "../services/activity.service";
import { getStudentProfileByUserId } from "../services/profile.service";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/errors";
import { requireUser } from "../utils/user";

const router = Router();

const activityCreateSchema = z.object({
  title: z.string().min(1),
  titleThai: z.string().min(1),
  description: z.string().min(1),
  type: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  location: z.string().min(1),
  organizer: z.string().min(1),
  activityHours: z.coerce.number().int().nonnegative(),
  gamificationPoints: z.coerce.number().int().nonnegative(),
  maxParticipants: z.coerce.number().int().positive().optional(),
  isGroupActivity: z.boolean().optional(),
  teamSize: z.coerce.number().int().positive().optional(),
  qrCode: z.string().optional(),
  checkInEnabled: z.boolean().optional(),
  status: z.string().optional(),
  registrationStatus: z.string().optional(),
  requiresPeerEvaluation: z.boolean().optional(),
  evaluations: z.any().optional(),
});

const activityQuerySchema = z.object({
  q: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  mine: z.enum(["true", "false"]).optional(),
});

const activityUpdateSchema = activityCreateSchema.partial();

const enrollmentStatusSchema = z.object({
  status: z.string().min(1),
});

router.get(
  "/activities",
  requireAuth,
  validate(activityQuerySchema, "query"),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const student =
      currentUser.role === Role.STUDENT && req.query.mine === "true"
        ? await getStudentProfileByUserId(currentUser.id)
        : null;

    const activities = await prisma.activity.findMany({
      where: {
        AND: [
          req.query.q
            ? {
                OR: [
                  { title: { contains: String(req.query.q), mode: "insensitive" } },
                  { titleThai: { contains: String(req.query.q), mode: "insensitive" } },
                  { description: { contains: String(req.query.q), mode: "insensitive" } },
                  { organizer: { contains: String(req.query.q), mode: "insensitive" } },
                ],
              }
            : {},
          req.query.status ? { status: String(req.query.status) } : {},
          req.query.type ? { type: String(req.query.type) } : {},
          student
            ? {
                enrollments: {
                  some: {
                    studentId: student.id,
                  },
                },
              }
            : {},
        ],
      },
      include: {
        enrollments: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: [{ startDate: "asc" }, { createdAt: "desc" }],
    });

    res.json({
      success: true,
      activities,
    });
  }),
);

router.get(
  "/activities/upcoming",
  asyncHandler(async (_req, res) => {
    const activities = await prisma.activity.findMany({
      where: {
        startDate: { gte: new Date() },
      },
      include: {
        enrollments: {
          include: {
            student: { include: { user: true } },
          },
        },
      },
      orderBy: { startDate: "asc" },
    });

    res.json({
      success: true,
      activities,
    });
  }),
);

router.post(
  "/activities",
  requireAuth,
  checkRole([Role.LECTURER, Role.STAFF, Role.ADMIN]),
  validate(activityCreateSchema),
  asyncHandler(async (req, res) => {
    const activity = await prisma.activity.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      activity,
    });
  }),
);

router.post(
  "/activities/enroll/:activityId",
  requireAuth,
  checkRole([Role.STUDENT]),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const student = await getStudentProfileByUserId(currentUser.id);
    const activityId = String(req.params.activityId);

    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      include: { enrollments: true },
    });

    if (!activity) {
      throw new AppError(404, "Activity not found");
    }

    if (activity.registrationStatus !== "open") {
      throw new AppError(400, "Registration is closed for this activity");
    }

    if (
      activity.maxParticipants &&
      activity.enrollments.length >= activity.maxParticipants
    ) {
      throw new AppError(400, "This activity is full");
    }

    const enrollment = await prisma.activityEnrollment.upsert({
      where: {
        activityId_studentId: {
          activityId: activity.id,
          studentId: student.id,
        },
      },
      update: {
        status: "registered",
      },
      create: {
        activityId: activity.id,
        studentId: student.id,
        status: "registered",
      },
      include: {
        activity: true,
      },
    });

    res.status(201).json({
      success: true,
      enrollment,
    });
  }),
);

router.post(
  "/activities/check-in/:activityId",
  requireAuth,
  checkRole([Role.STUDENT]),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const student = await getStudentProfileByUserId(currentUser.id);
    const enrollment = await checkInToActivity(String(req.params.activityId), student.id);

    res.json({
      success: true,
      enrollment,
    });
  }),
);

router.patch(
  "/activities/enrollments/:id/status",
  requireAuth,
  checkRole([Role.LECTURER, Role.STAFF, Role.ADMIN]),
  validate(enrollmentStatusSchema),
  asyncHandler(async (req, res) => {
    const enrollmentId = String(req.params.id);
    if (req.body.status === "completed") {
      const rewarded = await grantActivityReward(enrollmentId);
      return res.json({
        success: true,
        enrollment: rewarded,
      });
    }

    const enrollment = await prisma.activityEnrollment.update({
      where: { id: enrollmentId },
      data: {
        status: req.body.status,
      },
      include: {
        activity: true,
        student: { include: { user: true } },
      },
    });

    return res.json({
      success: true,
      enrollment,
    });
  }),
);

router.patch(
  "/activities/:id",
  requireAuth,
  checkRole([Role.LECTURER, Role.STAFF, Role.ADMIN]),
  validate(activityUpdateSchema),
  asyncHandler(async (req, res) => {
    const activityId = String(req.params.id);
    const existing = await prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!existing) {
      throw new AppError(404, "Activity not found");
    }

    const activity = await prisma.activity.update({
      where: { id: activityId },
      data: req.body,
    });

    res.json({
      success: true,
      activity,
    });
  }),
);

router.delete(
  "/activities/:id",
  requireAuth,
  checkRole([Role.LECTURER, Role.STAFF, Role.ADMIN]),
  asyncHandler(async (req, res) => {
    const activityId = String(req.params.id);
    await prisma.activityEnrollment.deleteMany({
      where: { activityId },
    });

    const activity = await prisma.activity.delete({
      where: { id: activityId },
    });

    res.json({
      success: true,
      activity,
    });
  }),
);

export const activitiesRoutes = router;
