import path from "path";
import fs from "fs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import diskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import s3StorageProvider from "@shared/providers/StorageProvider/S3StorageProvider";

export interface IRequest {
  userId: string;
  avatarFilename: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(userId);
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
    await userRepository.save(user);

    return user;
  }
}
