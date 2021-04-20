import { IUserToken } from "../models/IUserToken";

export interface IUserTokenRepository {
  generate(userId: string): Promise<IUserToken>;
  findLastTokenByUser(userId: string): Promise<IUserToken | undefined>;
  findByToken(token: string): Promise<IUserToken | undefined>;
  save(userToken: IUserToken): Promise<IUserToken>;
}
