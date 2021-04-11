import { Request, Response } from "express";
import { CreateSessionService, IRequest } from "../services/CreateSessionService";

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body as IRequest;
    const service = new CreateSessionService();
    const { user, token } = await service.execute({ email, password });
    console.log(token);
    return response.json(user);
  }
}

export default new SessionController();
