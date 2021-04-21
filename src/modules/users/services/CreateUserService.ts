import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import { ICreateUser } from "../domain/models/ICreateUser";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import MailService from "@shared/providers/MailProvider/MailService";

@injectable()
class CreateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
    @inject("MailService") private mailService: MailService,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists)
      throw new AppError("There is already one user with this email", 422);

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.mailService.sendWelcome(user);

    return user;
  }
}

export default CreateUserService;
