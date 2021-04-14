import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";

export interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError("User not found.", 404);

    const userToken = await userTokenRepository.generate(user.id);

    await EtherealMail.sendMail({
      subject: `Recuperação de senha: ${userToken.token}`,
      to: {
        email: user.email,
        name: user.name,
      },
    });
  }
}
