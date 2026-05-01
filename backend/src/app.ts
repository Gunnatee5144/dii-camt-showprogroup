import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error-handler";
import { notFoundHandler } from "./middleware/not-found";
import { initializePassport } from "./lib/passport";
import { openApiSpec } from "./openapi";
import { router } from "./routes";

export const app = express();

const configuredCorsOrigins = env.CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const developmentCorsOrigins =
  env.NODE_ENV === "development"
    ? ["http://localhost:8080", "http://127.0.0.1:8080", "http://localhost:5173", "http://127.0.0.1:5173"]
    : [];

const allowedCorsOrigins = new Set([...configuredCorsOrigins, ...developmentCorsOrigins]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedCorsOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(initializePassport());

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "ShowPro backend is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/docs.json", (_req, res) => {
  res.json(openApiSpec);
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);
