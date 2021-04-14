import { addHours, isAfter } from "date-fns";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";
import { hash } from "bcryptjs";

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) throw new AppError("User Token does not exists.", 404);

    const user = await userRepository.findById(userToken.userId);
    if (!user) throw new AppError("User does not exists.", 404);

    const lastUserToken = await userTokenRepository.findLastTokenByUser(user.id);
    if (lastUserToken?.id !== userToken.id || userToken.isUsed) throw new AppError("Invalid token", 400);

    const compareDate = addHours(userToken.created_at, 2);
    if (isAfter(Date.now(), compareDate)) throw new AppError("Token expired.", 400);

    user.password = await hash(password, 8);
    userToken.isUsed = true;

    await userTokenRepository.save(userToken);
    await userRepository.save(user);
  }
}
