import AppError from "@shared/errors/AppError";
import { Secret, sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUser } from "../domain/models/IUser";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

export interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError("Incorret email/password combination.", 401);

    const passwordValid = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordValid)
      throw new AppError("Incorret email/password combination.", 401);

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
