import { Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../lib/passport";
import { prisma } from "../lib/prisma";
import { checkRole } from "../middleware/check-role";
import { validate } from "../middleware/validate";
import { getCompanyProfileByUserId, getLecturerProfileByUserId } from "../services/profile.service";
import { createCompanyPayment } from "../services/subscription.service";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/errors";
import { requireUser } from "../utils/user";

const router = Router();

const budgetSchema = z.object({
  title: z.string().min(1),
  amount: z.coerce.number().positive(),
  type: z.string().min(1),
  category: z.string().min(1),
  date: z.coerce.date(),
  status: z.string().optional(),
  note: z.string().optional(),
});

const budgetUpdateSchema = budgetSchema.partial();

const cooperationSchema = z.object({
  companyId: z.string().min(1),
  title: z.string().min(1),
  type: z.string().min(1),
  details: z.string().optional(),
  expiryDate: z.coerce.date().optional(),
  status: z.string().optional(),
});

const workloadSchema = z.object({
  lecturerId: z.string().optional(),
  academicYear: z.string().min(1),
  semester: z.coerce.number().int().positive(),
  teachingHours: z.coerce.number().int().nonnegative(),
  researchHours: z.coerce.number().int().nonnegative(),
  advisingHours: z.coerce.number().int().nonnegative(),
  serviceHours: z.coerce.number().int().nonnegative().default(0),
});

const paymentSchema = z.object({
  companyId: z.string().optional(),
  amount: z.coerce.number().positive(),
  planName: z.string().min(1),
  status: z.string().optional(),
  receiptUrl: z.string().url().optional(),
  referenceNumber: z.string().optional(),
});

const paymentQuerySchema = z.object({
  companyId: z.string().optional(),
});

router.get(
  "/budget",
  requireAuth,
  checkRole([Role.STAFF, Role.ADMIN]),
  asyncHandler(async (_req, res) => {
    const budget = await prisma.budgetRecord.findMany({
      orderBy: { date: "desc" },
    });

    res.json({
      success: true,
      budget,
    });
  }),
);

router.post(
  "/budget",
  requireAuth,
  checkRole([Role.STAFF, Role.ADMIN]),
  validate(budgetSchema),
  asyncHandler(async (req, res) => {
    const record = await prisma.budgetRecord.create({
      data: {
        title: req.body.title,
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date,
        status: req.body.status ?? "pending",
        note: req.body.note,
      },
    });

    res.status(201).json({
      success: true,
      budget: record,
    });
  }),
);

router.patch(
  "/budget/:id",
  requireAuth,
  checkRole([Role.STAFF, Role.ADMIN]),
  validate(budgetUpdateSchema),
  asyncHandler(async (req, res) => {
    const budgetId = String(req.params.id);
    const existing = await prisma.budgetRecord.findUnique({ where: { id: budgetId } });

    if (!existing) {
      throw new AppError(404, "Budget record not found");
    }

    const record = await prisma.budgetRecord.update({
      where: { id: budgetId },
      data: {
        title: req.body.title,
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date,
        status: req.body.status,
        note: req.body.note,
      },
    });

    res.json({
      success: true,
      budget: record,
    });
  }),
);

router.delete(
  "/budget/:id",
  requireAuth,
  checkRole([Role.STAFF, Role.ADMIN]),
  asyncHandler(async (req, res) => {
    const budgetId = String(req.params.id);
    const existing = await prisma.budgetRecord.findUnique({ where: { id: budgetId } });

    if (!existing) {
      throw new AppError(404, "Budget record not found");
    }

    const record = await prisma.budgetRecord.delete({
      where: { id: budgetId },
    });

    res.json({
      success: true,
      budget: record,
    });
  }),
);

router.get(
  "/personnel",
  requireAuth,
  checkRole([Role.STAFF, Role.ADMIN]),
  asyncHandler(async (_req, res) => {
    const personnel = await prisma.user.findMany({
      where: {
        role: { in: [Role.LECTURER, Role.STAFF, Role.ADMIN] },
      },
      include: {
        lecturerProfile: true,
        staffProfile: true,
        adminProfile: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      personnel,
    });
  }),
);

router.get(
  "/cooperation",
  requireAuth,
  checkRole([Role.STAFF, Role.ADMIN, Role.COMPANY]),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const company = currentUser.role === Role.COMPANY ? await getCompanyProfileByUserId(currentUser.id) : null;

    const cooperation = await prisma.cooperationRecord.findMany({
      where: company ? { companyId: company.id } : undefined,
      include: {
        company: { include: { user: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      cooperation,
    });
  }),
);

router.post(
  "/cooperation",
  requireAuth,
  checkRole([Role.STAFF, Role.ADMIN]),
  validate(cooperationSchema),
  asyncHandler(async (req, res) => {
    const cooperation = await prisma.cooperationRecord.create({
      data: {
        companyId: req.body.companyId,
        title: req.body.title,
        type: req.body.type,
        details: req.body.details,
        expiryDate: req.body.expiryDate,
        status: req.body.status ?? "active",
      },
      include: {
        company: { include: { user: true } },
      },
    });

    res.status(201).json({
      success: true,
      cooperation,
    });
  }),
);

router.get(
  "/workload",
  requireAuth,
  checkRole([Role.LECTURER, Role.STAFF, Role.ADMIN]),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const lecturer =
      currentUser.role === Role.LECTURER ? await getLecturerProfileByUserId(currentUser.id) : null;

    const workload = await prisma.workloadRecord.findMany({
      where: lecturer ? { lecturerId: lecturer.id } : undefined,
      include: {
        lecturer: { include: { user: true } },
      },
      orderBy: [{ academicYear: "desc" }, { semester: "desc" }],
    });

    res.json({
      success: true,
      workload,
    });
  }),
);

router.post(
  "/workload",
  requireAuth,
  checkRole([Role.LECTURER, Role.STAFF, Role.ADMIN]),
  validate(workloadSchema),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const lecturerId =
      currentUser.role === Role.LECTURER
        ? (await getLecturerProfileByUserId(currentUser.id)).id
        : req.body.lecturerId;

    if (!lecturerId) {
      throw new AppError(400, "lecturerId is required");
    }

    const record = await prisma.workloadRecord.create({
      data: {
        lecturerId,
        academicYear: req.body.academicYear,
        semester: req.body.semester,
        teachingHours: req.body.teachingHours,
        researchHours: req.body.researchHours,
        advisingHours: req.body.advisingHours,
        serviceHours: req.body.serviceHours,
      },
      include: {
        lecturer: { include: { user: true } },
      },
    });

    res.status(201).json({
      success: true,
      workload: record,
    });
  }),
);

router.get(
  "/subscription/plans",
  asyncHandler(async (_req, res) => {
    res.json({
      success: true,
      plans: [
        {
          name: "free",
          price: 0,
          features: ["1 active job posting", "Basic applicant tracking", "Public company profile"],
        },
        {
          name: "pro",
          price: 4900,
          features: ["10 active job postings", "Talent search", "Intern tracking", "Priority support"],
        },
        {
          name: "enterprise",
          price: 12900,
          features: ["Unlimited postings", "Advanced analytics", "Dedicated success manager"],
        },
      ],
    });
  }),
);

router.get(
  "/subscription/payments",
  requireAuth,
  checkRole([Role.COMPANY, Role.ADMIN]),
  validate(paymentQuerySchema, "query"),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const companyId =
      currentUser.role === Role.COMPANY
        ? (await getCompanyProfileByUserId(currentUser.id)).id
        : req.query.companyId
          ? String(req.query.companyId)
          : undefined;

    const payments = await prisma.paymentHistory.findMany({
      where: companyId ? { companyId } : undefined,
      include: {
        company: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });

    res.json({
      success: true,
      payments,
    });
  }),
);

router.post(
  "/subscription/payment",
  requireAuth,
  checkRole([Role.COMPANY, Role.ADMIN]),
  validate(paymentSchema),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const companyId =
      currentUser.role === Role.COMPANY
        ? (await getCompanyProfileByUserId(currentUser.id)).id
        : req.body.companyId;

    if (!companyId) {
      throw new AppError(400, "companyId is required");
    }

    const payment = await createCompanyPayment({
      companyId,
      amount: req.body.amount,
      planName: req.body.planName,
      status: req.body.status,
      receiptUrl: req.body.receiptUrl,
      referenceNumber: req.body.referenceNumber,
    });

    res.status(201).json({
      success: true,
      payment,
    });
  }),
);

export const operationsRoutes = router;
