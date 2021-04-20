import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { NextFunction, Request, Response } from "express";
import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";
import { verify } from "jsonwebtoken";
import { defaultSecret } from "@shared/constants";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

@injectable()
class Authenticate {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  public async isAuthenticated(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new AppError("JWT Token is missing.", 403);

    const [, token] = authHeader.split(" ");
    try {
      const decodedToekn = verify(
        token,
        authConfig.jwt.secret || defaultSecret,
      );
      const { sub } = decodedToekn as ITokenPayload;
      const user = await this.userRepository.findById(sub);
      if (!user) throw new Error();

      request.user = { id: user.id };

      return next();
    } catch (error) {
      throw new AppError("Invalid JWT Token", 403);
    }
  }
}

export default Authenticate;
