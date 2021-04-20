import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import User from "../infra/typeorm/entities/User";

@injectable()
class ListUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<User[]> {
    return await this.userRepository.list();
  }
}

export default ListUserService;
