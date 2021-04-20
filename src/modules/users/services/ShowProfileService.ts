import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { IFindUser } from "../domain/models/IFindUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import User from "../infra/typeorm/entities/User";
import UserRepository from "../infra/typeorm/repositories/UserRepository";

@injectable()
class ShowProfileService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  public async execute({ userId }: IFindUser): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    return user;
  }
}

export default ShowProfileService;
