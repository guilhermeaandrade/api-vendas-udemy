import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Product from "@modules/products/infra/typeorm/entities/Product";
import Order from "./Order";
import { IOrderProduct } from "@modules/orders/domain/models/IOrderProduct";

@Entity("orders_products")
export default class OrdersProducts implements IOrderProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Order, order => order.orderProducts)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => Product, product => product.orderProducts)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ name: "order_id" })
  orderId: string;

  @Column({ name: "product_id" })
  productId: string;

  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
