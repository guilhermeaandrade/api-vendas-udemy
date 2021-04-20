import { IUserToken } from "@modules/users/domain/models/IUserToken";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";
import { getRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";

export default class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async findLastTokenByUser(
    userId: string,
  ): Promise<UserToken | undefined> {
    const userTokens = await this.ormRepository.find({
      where: { userId },
      order: { createdAt: "DESC" },
      take: 1,
    });

    if (userTokens.length) return userTokens[0];
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ userId });
    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async save(userToken: IUserToken): Promise<IUserToken> {
    await this.ormRepository.save(userToken);

    return userToken;
  }
}
