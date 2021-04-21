import "reflect-metadata";
import DeleteCustomerService from "./DeleteCustomerService";
import FakeCustomerRepository from "@modules/customers/domain/repositories/fakes/FakeCustomerRepository";
import { ICustomer } from "../domain/models/ICustomer";
import AppError from "@shared/errors/AppError";

const fakeCustomerRepository = new FakeCustomerRepository();
const deleteCustomer = new DeleteCustomerService(fakeCustomerRepository);

describe("DeleteCustomer", () => {
  it("should be able to delete a customer", async () => {
    const customer: ICustomer = {
      id: "fd62ab79-210a-44aa-8351-e152013d4f59",
      name: "Guilherme Andrade",
      email: "guilhermeaandrade+91@gmail.com",
      createdAt: new Date("2021-04-16T03:26:26.036Z"),
      updatedAt: new Date("2021-04-19T20:18:20.240Z"),
    };

    fakeCustomerRepository.findById = jest.fn().mockResolvedValue(customer);
    fakeCustomerRepository.remove = jest.fn().mockResolvedValue(undefined);

    await deleteCustomer.execute({
      id: "4022645f-3dc2-438d-a875-0b388e903a23",
    });

    expect(fakeCustomerRepository.findById).toHaveBeenCalledWith(
      "4022645f-3dc2-438d-a875-0b388e903a23",
    );
    expect(fakeCustomerRepository.remove).toHaveBeenCalledWith(customer);
  });

  it("should not be able to delete a customer that not exists", async () => {
    const error = new AppError("Customer not found.", 404);

    fakeCustomerRepository.findById = jest.fn().mockResolvedValue(undefined);
    fakeCustomerRepository.remove = jest.fn();

    await expect(
      deleteCustomer.execute({
        id: "4022645f-3dc2-438d-a875-0b388e903a23",
      }),
    ).rejects.toStrictEqual(error);

    expect(fakeCustomerRepository.findById).toHaveBeenCalledWith(
      "4022645f-3dc2-438d-a875-0b388e903a23",
    );
    expect(fakeCustomerRepository.remove).not.toHaveBeenCalled();
  });
});
