import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import { hash } from "bcryptjs";

export interface ICreateRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: ICreateRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailExists = await userRepository.findByEmail(email);
    if (emailExists) throw new AppError("There is already one user with this email", 422);

    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({ name, email, password: hashedPassword });
    await userRepository.save(user);

    return user;
  }
}
