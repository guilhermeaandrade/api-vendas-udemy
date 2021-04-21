import path from "path";
import mailConfig, { ISendMail } from "@config/mail/mailConfig";
import { IUser } from "@modules/users/domain/models/IUser";
import EtherealMail from "./EtherealMail";
import { IMail } from "./IMail";
import SESMail from "./SESMail";

class MailService implements IMail {
  public async sendResetPassword(token: string, user: IUser): Promise<void> {
    const link = `${process.env.APP_WEB_URL}/v1/password/reset_password?token=${token}`;

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      ".",
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

  public async sendWelcome(user: IUser): Promise<void> {
    const welcome = path.resolve(__dirname, ".", "views", "welcome.hbs");
    const subject = "[API Vendas] Bem-vindo à Loja Virtual";
    const sendMail: ISendMail = {
      subject,
      to: {
        name: user.name,
        email: user.email,
      },
      templateData: {
        file: welcome,
        variables: {
          name: user.name,
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

export default MailService;
