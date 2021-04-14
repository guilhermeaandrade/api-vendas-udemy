import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

export class ListUsersService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.find();
  }
}
