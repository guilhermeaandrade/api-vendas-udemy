import "reflect-metadata";
import CreateCustomerService from "./CreateCustomerService";
import FakeCustomerRepository from "@modules/customers/domain/repositories/fakes/FakeCustomerRepository";
import AppError from "@shared/errors/AppError";
import { ICustomer } from "../domain/models/ICustomer";

const fakeCustomerRepository = new FakeCustomerRepository();
const createCustomer = new CreateCustomerService(fakeCustomerRepository);

describe("CreateCustomer", () => {
  it("should be able to create a new customer", async () => {
    fakeCustomerRepository.findByEmail = jest.fn().mockResolvedValue(undefined);
    fakeCustomerRepository.create = jest.fn().mockResolvedValue({
      id: "fd62ab79-210a-44aa-8351-e152013d4f59",
      name: "Guilherme Andrade",
      email: "guilhermeaandrade91@gmail.com",
      createdAt: new Date("2021-04-16T03:26:26.036Z"),
      updatedAt: new Date("2021-04-19T20:18:20.240Z"),
    });

    const customer = await createCustomer.execute({
      name: "Guilherme Andrade",
      email: "guilhermeaandrade91@gmail.com",
    });

    expect(fakeCustomerRepository.findByEmail).toHaveBeenCalledWith(
      "guilhermeaandrade91@gmail.com",
    );
    expect(fakeCustomerRepository.create).toHaveBeenCalledWith({
      name: "Guilherme Andrade",
      email: "guilhermeaandrade91@gmail.com",
    });
    expect(customer).toHaveProperty("id");
    expect(customer.name).toStrictEqual("Guilherme Andrade");
    expect(customer.email).toStrictEqual("guilhermeaandrade91@gmail.com");
  });

  it("should not be able to create two customers with the same email", async () => {
    const error = new AppError("Email address already used.", 400);
    const customer: ICustomer = {
      id: "fd62ab79-210a-44aa-8351-e152013d4f59",
      name: "Guilherme Andrade",
      email: "guilhermeaandrade+91@gmail.com",
      createdAt: new Date("2021-04-16T03:26:26.036Z"),
      updatedAt: new Date("2021-04-19T20:18:20.240Z"),
    };

    fakeCustomerRepository.findByEmail = jest.fn().mockResolvedValue(customer);

    expect(
      createCustomer.execute({
        name: "Guilherme Andrade",
        email: "guilhermeaandrade91@gmail.com",
      }),
    ).rejects.toStrictEqual(error);
  });
});
