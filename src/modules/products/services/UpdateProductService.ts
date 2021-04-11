import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import { ShowProductsService } from "./ShowProductService";

interface IUpdateRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductsService {
  public async execute({ id, name, price, quantity }: IUpdateRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await new ShowProductsService().execute({ id });

    const productExists = await productRepository.findByName(name);
    if (productExists && productExists.id !== id)
      throw new AppError("Product already exists", 422);

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}
