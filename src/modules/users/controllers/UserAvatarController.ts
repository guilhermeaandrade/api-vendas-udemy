import { Request, Response } from "express";
import {
  UpdateUserAvatarService,
  IRequest,
} from "../services/UpdateUserAvatarService";
import { classToClass } from "class-transformer";

class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const params: IRequest = {
      userId: request.user.id,
      avatarFilename: request.file.filename,
    };

    const service = new UpdateUserAvatarService();
    const user = await service.execute(params);

    return response.json(classToClass(user));
  }
}

export default new UserAvatarController();
