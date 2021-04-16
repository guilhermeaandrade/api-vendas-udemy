import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

const redisClient = redis.createClient({
  host: process.env.APP_REDIS_HOST,
  port: Number(process.env.APP_REDIS_PORT),
  password: process.env.APP_REDIS_PASSWORD,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "ratelimit",
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError("Too many requests.", 429);
  }
}
