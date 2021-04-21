import "reflect-metadata";
import FakeUsersRepository from "@modules/users/domain/repositories/fakes/FakeUserRepository";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateSessionsService from "./CreateSessionService";

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;

jest.mock("@config/auth", () => {
  return {
    jwt: {
      secret: "c1e421c4eec468ddcf8d1e8580e07289",
      expiresIn: "1d",
    },
  };
});

describe("CreateSession", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should be able to authenticate", async () => {
    const user = await fakeUsersRepository.create({
      name: "Guilherme Andrade",
      email: "guilhermeaandrade91@gmail.com",
      password: "123456",
    });

    const response = await createSession.execute({
      email: "guilhermeaandrade91@gmail.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not be able to authenticate with non existent user", async () => {
    expect(
      createSession.execute({
        email: "guilhermeaandrade91@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await fakeUsersRepository.create({
      name: "Guilherme Andrade",
      email: "guilhermeaandrade91@gmail.com",
      password: "123456",
    });

    expect(
      createSession.execute({
        email: "guilhermeaandrade91@gmail.com",
        password: "567890",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
