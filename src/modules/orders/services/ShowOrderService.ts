import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IOrder } from "../domain/models/IOrder";
import { IOrderRepository } from "../domain/respositories/IOrderRepository";

interface IRequest {
  id: string;
}

@injectable()
class ShowOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IOrder> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new AppError("Order not found.", 404);

    return order;
  }
}

export default ShowOrderService;
