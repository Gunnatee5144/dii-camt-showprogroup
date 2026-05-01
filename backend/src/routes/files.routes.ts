import { FileVisibility, Role } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { optionalAuth, requireAuth } from "../lib/passport";
import { prisma } from "../lib/prisma";
import { checkRole } from "../middleware/check-role";
import { validate } from "../middleware/validate";
import {
  buildManagedAssetResponse,
  canDirectlyAccessAsset,
  createManagedFileAsset,
  createSignedDownloadToken,
  getFileAssetById,
  getFileAssetFromSignedToken,
  requireUploadedFile,
  resolveAssetAbsolutePath,
  serializeFileAsset,
  toFileVisibility,
  uploadMiddleware,
} from "../services/file-storage.service";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/errors";
import { requireUser } from "../utils/user";

const router = Router();

const uploadQuerySchema = z.object({
  category: z.string().optional(),
  visibility: z.enum(["public", "private"]).optional(),
});

const assetIdParamsSchema = z.object({
  id: z.string().min(1),
});

const signedDownloadQuerySchema = z.object({
  token: z.string().min(1),
});

router.post(
  "/files/upload",
  requireAuth,
  validate(uploadQuerySchema, "query"),
  uploadMiddleware.single("file"),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const file = requireUploadedFile(req);

    const asset = await createManagedFileAsset(file, {
      uploaderId: currentUser.id,
      visibility: toFileVisibility(
        typeof req.query.visibility === "string" ? req.query.visibility : undefined,
      ),
      category: typeof req.query.category === "string" ? req.query.category : undefined,
    });

    res.status(201).json({
      success: true,
      asset: buildManagedAssetResponse(asset),
    });
  }),
);

router.get(
  "/files/assets/:id",
  requireAuth,
  validate(assetIdParamsSchema, "params"),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const asset = await getFileAssetById(String(req.params.id));

    if (!canDirectlyAccessAsset(asset, currentUser)) {
      throw new AppError(403, "You do not have access to this file");
    }

    const absolutePath = resolveAssetAbsolutePath(asset.storagePath);
    return res.download(absolutePath, asset.originalName);
  }),
);

router.get(
  "/files/public/:id",
  optionalAuth,
  validate(assetIdParamsSchema, "params"),
  asyncHandler(async (req, res) => {
    const asset = await getFileAssetById(String(req.params.id));

    if (asset.visibility !== FileVisibility.PUBLIC) {
      throw new AppError(403, "This file is private");
    }

    const absolutePath = resolveAssetAbsolutePath(asset.storagePath);
    return res.download(absolutePath, asset.originalName);
  }),
);

router.get(
  "/files/assets/:id/sign",
  requireAuth,
  validate(assetIdParamsSchema, "params"),
  asyncHandler(async (req, res) => {
    const currentUser = requireUser(req);
    const asset = await getFileAssetById(String(req.params.id));

    if (!canDirectlyAccessAsset(asset, currentUser)) {
      throw new AppError(403, "You do not have access to sign this file");
    }

    res.json({
      success: true,
      asset: serializeFileAsset(asset),
      signedUrl: `/api/files/download?token=${createSignedDownloadToken(asset.id)}`,
    });
  }),
);

router.get(
  "/files/download",
  validate(signedDownloadQuerySchema, "query"),
  asyncHandler(async (req, res) => {
    const token = String(req.query.token);
    const asset = await getFileAssetFromSignedToken(token);
    const absolutePath = resolveAssetAbsolutePath(asset.storagePath);

    return res.download(absolutePath, asset.originalName);
  }),
);

router.get(
  "/files/assets",
  requireAuth,
  checkRole([Role.ADMIN, Role.STAFF]),
  asyncHandler(async (_req, res) => {
    const assetRows = await prisma.fileAsset.findMany({
      orderBy: { createdAt: "desc" },
    });
    const assets = assetRows.map((asset) => buildManagedAssetResponse(asset));

    res.json({
      success: true,
      assets,
    });
  }),
);

export const filesRoutes = router;
