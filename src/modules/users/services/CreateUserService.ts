import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import { hash } from "bcryptjs";
import { ICreateUser } from "../domain/models/ICreateUser";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
class CreateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists)
      throw new AppError("There is already one user with this email", 422);

    const hashedPassword = await hash(password, 8);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
