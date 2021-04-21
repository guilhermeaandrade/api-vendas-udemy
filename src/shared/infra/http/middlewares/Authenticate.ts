import { NextFunction, Request, Response } from "express";
import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";
import { Secret, verify } from "jsonwebtoken";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function isAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError("JWT Token is missing.", 403);

  const [, token] = authHeader.split(" ");
  try {
    const decodedToekn = verify(token, authConfig.jwt.secret as Secret);
    const { sub } = decodedToekn as ITokenPayload;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(sub);
    if (!user) throw new Error();

    request.user = { id: user.id };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT Token", 403);
  }
}
