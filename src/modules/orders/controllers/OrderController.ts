import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ShowOrderService from "../services/ShowOrderService";

class OrderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = new ShowOrderService();
    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body;

    const createOrder = new CreateOrderService();
    const order = await createOrder.execute({ customerId, products });

    return response.json(order);
  }
}

export default new OrderController();
