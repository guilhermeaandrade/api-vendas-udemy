import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import authConfig from '@config/auth';
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError("JWT Token is missing.", 403);

  const [, token] = authHeader.split(" ");
  try {
    const decodedToekn = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToekn as ITokenPayload;
    request.user = { id: sub };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT Token", 403);
  }
}
