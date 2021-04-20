import AppError from "@shared/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";
import mailConfig, { ISendMail } from "@config/mail/mail";
import SESMail from "@config/mail/SESMail";
import User from "../infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserTokenRepository } from "../domain/repositories/IUserTokenRepository";

export interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError("User not found.", 404);

    const { token } = await this.userTokenRepository.generate(user.id);
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

export default SendForgotPasswordEmailService;
