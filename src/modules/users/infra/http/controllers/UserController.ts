import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../../../services/CreateUserService";
import ListUserService from "../../../services/ListUserService";
import { classToClass } from "class-transformer";

class UserController {
  async index(_request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListUserService);
    const users = await service.execute();

    return response.json(classToClass(users));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const service = container.resolve(CreateUserService);
    const user = await service.execute({ name, email, password });

    return response.status(201).json(classToClass(user));
  }
}

export default new UserController();
