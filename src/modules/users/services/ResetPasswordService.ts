import { addHours, isAfter } from "date-fns";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserTokenRepository } from "../domain/repositories/IUserTokenRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);
    if (!userToken) throw new AppError("User Token does not exists.", 404);

    const user = await this.userRepository.findById(userToken.userId);
    if (!user) throw new AppError("User does not exists.", 404);

    const lastUserToken = await this.userTokenRepository.findLastTokenByUser(
      user.id,
    );
    if (lastUserToken?.id !== userToken.id || userToken.isUsed)
      throw new AppError("Invalid token", 400);

    const compareDate = addHours(userToken.createdAt, 2);
    if (isAfter(Date.now(), compareDate))
      throw new AppError("Token expired.", 400);

    user.password = await hash(password, 8);
    userToken.isUsed = true;

    await this.userTokenRepository.save(userToken);
    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
