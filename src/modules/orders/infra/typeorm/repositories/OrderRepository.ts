import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";
import { IOrder } from "@modules/orders/domain/models/IOrder";
import { IOrderRepository } from "@modules/orders/domain/respositories/IOrderRepository";
import { getRepository, Repository } from "typeorm";
import Order from "../entities/Order";

export default class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<IOrder | undefined> {
    const order = await this.ormRepository.findOne(id, {
      relations: ["orderProducts", "customer"],
    });

    return order;
  }

  public async createOrder({
    customer,
    products,
  }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({
      customer,
      orderProducts: products,
    });
    await this.ormRepository.save(order);

    return order;
  }
}
