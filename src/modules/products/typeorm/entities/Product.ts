import OrdersProducts from "@modules/orders/typeorm/entities/OrdersProducts";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export default class Product {
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
