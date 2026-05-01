import { Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../lib/passport";
import { prisma } from "../lib/prisma";
import { checkRole } from "../middleware/check-role";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

const facilitySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  building: z.string().min(1),
  room: z.string().optional(),
  floor: z.string().optional(),
  type: z.string().min(1),
  capacity: z.coerce.number().int().nonnegative().default(0),
  isActive: z.boolean().optional(),
  notes: z.string().optional(),
});

const facilityUpdateSchema = facilitySchema.partial();

router.get(
  "/facilities",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const facilities = await prisma.facility.findMany({
      include: {
        sections: {
          include: {
            course: true,
          },
        },
      },
      orderBy: [{ building: "asc" }, { room: "asc" }],
    });

    res.json({
      success: true,
      facilities,
    });
  }),
);

router.post(
  "/facilities",
  requireAuth,
  checkRole([Role.STAFF, Role.ADMIN]),
  validate(facilitySchema),
  asyncHandler(async (req, res) => {
    const facility = await prisma.facility.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      facility,
    });
  }),
);

router.patch(
  "/facilities/:id",
  requireAuth,
  checkRole([Role.STAFF, Role.ADMIN]),
  validate(facilityUpdateSchema),
  asyncHandler(async (req, res) => {
    const facility = await prisma.facility.update({
      where: { id: String(req.params.id) },
      data: req.body,
    });

    res.json({
      success: true,
      facility,
    });
  }),
);

router.delete(
  "/facilities/:id",
  requireAuth,
  checkRole([Role.STAFF, Role.ADMIN]),
  asyncHandler(async (req, res) => {
    const sectionCount = await prisma.section.count({
      where: { facilityId: String(req.params.id) },
    });

    if (sectionCount > 0) {
      const facility = await prisma.facility.update({
        where: { id: String(req.params.id) },
        data: { isActive: false },
      });

      return res.json({
        success: true,
        message: "Facility has linked sections and was deactivated instead of deleted.",
        facility,
      });
    }

    const facility = await prisma.facility.delete({
      where: { id: String(req.params.id) },
    });

    return res.json({
      success: true,
      facility,
    });
  }),
);

export const facilitiesRoutes = router;
