import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import authConfig from "@config/auth";
import { verify } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UserRepository from "@modules/users/typeorm/repositories/UserRepository";

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
    const decodedToekn = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToekn as ITokenPayload;

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(sub);
    if (!user) throw new Error();

    request.user = { id: user.id };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT Token", 403);
  }
}
