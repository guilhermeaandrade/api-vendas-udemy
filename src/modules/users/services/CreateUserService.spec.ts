import "reflect-metadata";
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from "@modules/users/domain/repositories/fakes/FakeUserRepository";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import MailService from "@shared/providers/MailProvider/MailService";

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let mailService: MailService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    mailService = new MailService();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      mailService,
    );
  });

  it("should be able to create a new user", async () => {
    mailService.sendWelcome = jest.fn().mockResolvedValue(undefined);

    const user = await createUser.execute({
      name: "Guilherme Andrade",
      email: "guilhermeaandrade91@gmail.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create two users with the same email", async () => {
    mailService.sendWelcome = jest.fn().mockResolvedValue(undefined);

    await createUser.execute({
      name: "Guilherme Andrade",
      email: "guilhermeaandrade91@gmail.com",
      password: "123456",
    });

    expect(
      createUser.execute({
        name: "Guilherme Andrade",
        email: "guilhermeaandrade91@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
