import type { Role } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors";

export const checkRole =
  (roles: Role[]) => (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, "Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "You do not have permission to access this resource"));
    }

    next();
  };
