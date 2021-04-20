import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";
import { ICustomerPaginate } from "../models/ICustomerPaginate";

export interface ICustomerRepository {
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
  listCustomers(): Promise<ICustomerPaginate>;
}
