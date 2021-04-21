import { v4 as uuidv4 } from "uuid";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { ICreateCustomer } from "../../models/ICreateCustomer";
import { ICustomer } from "../../models/ICustomer";
import { ICustomerPaginate } from "../../models/ICustomerPaginate";
import { ICustomerRepository } from "../ICustomerRepository";

class FakeCustomerRepository implements ICustomerRepository {
  private customers: ICustomer[] = [];

  public async findByName(name: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );
    this.customers[findIndex] = customer;

    return customer;
  }

  public async remove(customer: ICustomer): Promise<void> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );
    this.customers = this.customers.splice(findIndex, 1);
  }

  public async listCustomers(): Promise<ICustomerPaginate> {
    return {} as ICustomerPaginate;
  }
}

export default FakeCustomerRepository;
