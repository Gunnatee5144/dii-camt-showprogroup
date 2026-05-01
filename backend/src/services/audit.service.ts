import type { Request } from "express";
import { prisma } from "../lib/prisma";

type AuditPayload = {
  userId?: string | null;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: unknown;
  status?: string;
  errorMessage?: string;
  req?: Pick<Request, "ip">;
};

export const createAuditLog = async (payload: AuditPayload) =>
  prisma.auditLog.create({
    data: {
      userId: payload.userId ?? null,
      action: payload.action,
      resource: payload.resource,
      resourceId: payload.resourceId,
      changes: payload.changes as never,
      status: payload.status ?? "success",
      errorMessage: payload.errorMessage,
      ipAddress: payload.req?.ip,
    },
  });
