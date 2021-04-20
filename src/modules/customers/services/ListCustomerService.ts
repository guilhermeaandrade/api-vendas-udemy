import { inject, injectable } from "tsyringe";
import { ICustomerPaginate } from "../domain/models/ICustomerPaginate";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";

@injectable()
class ListCustomerService {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(): Promise<ICustomerPaginate> {
    const customers = await this.customerRepository.listCustomers();
    return customers;
  }
}

export default ListCustomerService;
