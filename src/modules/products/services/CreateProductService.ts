import { getCustomRepository } from "typeorm";
import ProductRepository from "../typeorm/repositories/ProductRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import redisCache from "@shared/cache/RedisCache";
import {
  REDIS_CACHE_PRODUCT_LIST,
  REDIS_CACHE_PRODUCT_SHOW,
} from "@shared/constants";

export interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);
    if (productExists)
      throw new AppError("There is already one product with this name", 422);

    const product = productRepository.create({ name, price, quantity });
    await this.invalidateCache();
    await productRepository.save(product);

    return product;
  }

  private async invalidateCache(): Promise<void> {
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_LIST);
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_SHOW);
  }
}
