import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";

interface IRequest {
  id: string;
}

export class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) throw new AppError("Customer not found.", 404);

    await customerRepository.remove(customer);
  }
}
