import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";

export interface IProduct {
  id: string;
  name: string;
  orderProducts: OrdersProducts[];
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
