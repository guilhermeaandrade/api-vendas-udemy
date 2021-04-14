import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export default class UserTokenRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: { token },
    });

    return userToken;
  }

  public async findLastTokenByUser(userId: string): Promise<UserToken | undefined> {
    const userTokens = await this.find({
      where: { userId },
      order: { created_at: 'DESC' },
      take: 1
    });

    if (userTokens.length) return userTokens[0];
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.create({ userId });
    await this.save(userToken);

    return userToken;
  }
}
