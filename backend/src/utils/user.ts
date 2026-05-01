import { Role, type Prisma } from "@prisma/client";
import type { Request } from "express";
import { AppError } from "./errors";

export const roleInclude = {
  studentProfile: {
    include: {
      advisor: { include: { user: true } },
      skills: { include: { skill: true } },
      portfolio: { include: { projects: true } },
      consent: true,
      badges: true,
      timeline: { orderBy: { date: "desc" as const }, take: 20 },
    },
  },
  lecturerProfile: true,
  staffProfile: true,
  companyProfile: true,
  adminProfile: true,
} satisfies Prisma.UserInclude;

export const requireUser = (req: Request) => {
  if (!req.user) {
    throw new AppError(401, "Authentication required");
  }

  return req.user;
};

export const isPrivilegedRole = (role: Role) =>
  role === Role.ADMIN || role === Role.STAFF || role === Role.LECTURER;
