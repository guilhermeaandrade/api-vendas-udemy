import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import OrdersProducts from "./OrdersProducts";
import { IOrder } from "@modules/orders/domain/models/IOrder";

@Entity("orders")
export default class Order implements IOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => OrdersProducts, orderProduct => orderProduct.order, {
    cascade: true,
  })
  orderProducts: OrdersProducts[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
