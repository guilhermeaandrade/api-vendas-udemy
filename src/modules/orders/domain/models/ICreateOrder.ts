import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { ICreateOrderProduct } from "./ICreateOrderProduct";
import { IOrderProduct } from "./IOrderProduct";

export interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProduct[];
}

export interface ICreateOrderRequest {
  customerId: string;
  products: IOrderProductRequest[];
}

export interface IOrderProductRequest {
  id: string;
  quantity: number;
}
