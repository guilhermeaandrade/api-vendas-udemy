import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { ICustomer } from "../domain/models/ICustomer";
import { IFindCustomer } from "../domain/models/IFindCustomer";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";

@injectable()
class ShowCustomerService {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IFindCustomer): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) throw new AppError("Customer not found.", 404);

    return customer;
  }
}

export default ShowCustomerService;
