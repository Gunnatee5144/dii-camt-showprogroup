import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details ?? null,
    });
  }

  const fallback =
    error instanceof Error ? error.message : "Unexpected error while processing request";

  return res.status(500).json({
    success: false,
    message: fallback,
  });
};
