import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";
import { IProduct } from "@modules/products/domain/models/IProduct";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export default class Product implements IProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => OrdersProducts, orderProduct => orderProduct.product, {
    cascade: true,
  })
  orderProducts: OrdersProducts[];

  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
