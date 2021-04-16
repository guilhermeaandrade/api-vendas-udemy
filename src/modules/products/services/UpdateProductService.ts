import redisCache from "@shared/cache/RedisCache";
import {
  REDIS_CACHE_PRODUCT_LIST,
  REDIS_CACHE_PRODUCT_SHOW,
} from "@shared/constants";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";
import { ShowProductsService } from "./ShowProductService";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductsService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await new ShowProductsService().execute({ id });

    const productExists = await productRepository.findByName(name);
    if (productExists && productExists.id !== id)
      throw new AppError("Product already exists", 422);

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);
    await this.invalidateCache();

    return product;
  }

  private async invalidateCache(): Promise<void> {
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_LIST);
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_SHOW);
  }
}
