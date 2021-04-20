import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IUserToken } from "@modules/users/domain/models/IUserToken";

@Entity("user_tokens")
export default class UserToken implements IUserToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Generated("uuid")
  token: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "is_used", default: false })
  isUsed: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
