import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserTokenRepository } from "../domain/repositories/IUserTokenRepository";
import MailService from "@shared/providers/MailProvider/MailService";

export interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("MailService") private mailService: MailService,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError("User not found.", 404);

    const { token } = await this.userTokenRepository.generate(user.id);
    await this.mailService.sendResetPassword(token, user);
  }
}

export default SendForgotPasswordEmailService;
