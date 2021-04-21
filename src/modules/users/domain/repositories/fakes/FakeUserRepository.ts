import { v4 as uuidv4 } from "uuid";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import { IUser } from "../../models/IUser";

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async list(): Promise<IUser[]> {
    return this.users;
  }

  public async findByName(name: string): Promise<IUser | undefined> {
    return this.users.find(user => user.name === name);
  }

  public async findById(id: string): Promise<IUser | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    return this.users.find(user => user.email === email);
  }
}

export default FakeUsersRepository;
