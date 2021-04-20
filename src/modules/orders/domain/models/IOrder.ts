import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { IOrderProduct } from "./IOrderProduct";

export interface IOrder {
  id: string;
  customer: ICustomer;
  orderProducts: IOrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}
