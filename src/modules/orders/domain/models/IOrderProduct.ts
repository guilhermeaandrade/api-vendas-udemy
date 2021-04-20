import { IProduct } from "@modules/products/domain/models/IProduct";
import { IOrder } from "./IOrder";

export interface IOrderProduct {
  id: string;
  order: IOrder;
  product: IProduct;
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
