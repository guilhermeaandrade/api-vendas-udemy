import nodemailer from "nodemailer";
import aws from "aws-sdk";
import HandlebarsMailTemplate from "./HandlebarsMailTemplate";
import { ISendMail } from "./mail";
import mailConfig from "@config/mail/mail";

export default class SESMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
      }),
    });

    const { email, name } = mailConfig.defaults.from;
    await transporter.sendMail({
      subject,
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      html: await mailTemplate.parse(templateData),
    });
  }
}
