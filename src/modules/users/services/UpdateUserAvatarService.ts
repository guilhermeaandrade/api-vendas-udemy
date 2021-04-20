import User from "../infra/typeorm/entities/User";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import diskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import s3StorageProvider from "@shared/providers/StorageProvider/S3StorageProvider";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";

export interface IRequest {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    let filename = "";
    if (uploadConfig.driver === "s3") {
      if (user.avatar) {
        await s3StorageProvider.deleteFile(user.avatar);
      }
      filename = await s3StorageProvider.saveFile(avatarFilename);
    } else {
      if (user.avatar) {
        await diskStorageProvider.deleteFile(user.avatar);
      }
      filename = await diskStorageProvider.saveFile(avatarFilename);
    }

    user.avatar = filename;
    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
