import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject, ZodError } from "zod";
import { AppError } from "../utils/errors";

type ValidationTarget = "body" | "query" | "params";

export const validate =
  (schema: AnyZodObject, target: ValidationTarget = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req[target] = schema.parse(req[target]);
      next();
    } catch (error) {
      const zodError = error as ZodError;
      next(new AppError(400, "Validation failed", zodError.flatten()));
    }
  };
