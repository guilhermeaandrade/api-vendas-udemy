import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import { pagination } from "typeorm-pagination";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";
import uploadConfig from "@config/upload";
import rateLimiter from "@shared/http/middlewares/rateLimiter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);

app.use("/files", express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());
app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

const port = process.env.APP_PORT || 3333;
app.listen(port, () => {
  console.log(`Server started on port ${port}! 🏆`);
});
