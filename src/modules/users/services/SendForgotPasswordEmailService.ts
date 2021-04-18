import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";
import mailConfig, { ISendMail } from "@config/mail/mail";
import SESMail from "@config/mail/SESMail";
import User from "../typeorm/entities/User";

export interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError("User not found.", 404);

    const { token } = await userTokenRepository.generate(user.id);
    await this.sendMail(token, user);
  }

  private async sendMail(token: string, user: User): Promise<void> {
    const link = `${process.env.APP_WEB_URL}/v1/password/reset_password?token=${token}`;

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs",
    );

    const subject = "[API Vendas] Recuperação de Senha";
    const sendMail: ISendMail = {
      subject,
      to: {
        name: user.name,
        email: user.email,
      },
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link,
        },
      },
    };

    if (mailConfig.driver === "ses") {
      await SESMail.sendMail(sendMail);
      return;
    }

    await EtherealMail.sendMail(sendMail);
  }
}
