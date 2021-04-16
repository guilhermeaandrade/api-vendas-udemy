import { IPaginate } from "@shared/types/paginate";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";

interface ICustomersPaginate extends IPaginate {
  data: Customer[];
}

export default class ListCustomerService {
  public async execute(): Promise<ICustomersPaginate> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customers = await customerRepository.createQueryBuilder().paginate();
    return customers as ICustomersPaginate;
  }
}
