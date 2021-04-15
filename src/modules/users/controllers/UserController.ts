import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ListUserService } from "../services/ListUserService";

class UserController {
  async index(_request: Request, response: Response): Promise<Response> {
    const service = new ListUserService();
    const users = await service.execute();

    return response.json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const service = new CreateUserService();
    const user = await service.execute({ name, email, password });

    return response.status(201).json(user);
  }
}

export default new UserController();
