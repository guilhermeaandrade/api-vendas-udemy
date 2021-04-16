import redisCache from "@shared/cache/RedisCache";
import { REDIS_CACHE_PRODUCT_SHOW } from "@shared/constants";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";

interface IRequest {
  id: string;
}

export class ShowProductsService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    let product = await redisCache.recover<Product>(REDIS_CACHE_PRODUCT_SHOW);
    if (!product) {
      product = await productRepository.findOne(id);
      if (!product) {
        throw new AppError("Product not found.", 404);
      }

      await redisCache.save(REDIS_CACHE_PRODUCT_SHOW, product);
    }

    return product;
  }
}
