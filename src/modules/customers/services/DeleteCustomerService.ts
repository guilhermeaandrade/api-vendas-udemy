import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { IFindCustomer } from "../domain/models/IFindCustomer";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";

@injectable()
class DeleteCustomerService {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IFindCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) throw new AppError("Customer not found.", 404);

    await this.customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
