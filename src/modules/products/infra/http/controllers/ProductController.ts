import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateProductService from "../../../services/CreateProductService";
import DeleteProductsService from "../../../services/DeleteProductService";
import ListProductsService from "../../../services/ListProductService";
import ShowProductsService from "../../../services/ShowProductService";
import UpdateProductsService from "../../../services/UpdateProductService";

class ProductController {
  async index(_request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListProductsService);
    const products = await service.execute();

    return response.json(products);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const service = container.resolve(ShowProductsService);
    const product = await service.execute({ id });

    return response.json(product);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const service = container.resolve(DeleteProductsService);
    await service.execute({ id });

    return response.json({ message: "Product successfully deleted" });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const service = container.resolve(CreateProductService);
    const product = await service.execute({ name, price, quantity });

    return response.status(201).json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const service = container.resolve(UpdateProductsService);
    const product = await service.execute({ id, name, price, quantity });

    return response.json(product);
  }
}

export default new ProductController();
