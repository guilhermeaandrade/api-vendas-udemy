import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";
import redisCache from "@shared/cache/RedisCache";
import { REDIS_CACHE_PRODUCT_LIST } from "@shared/constants";

export class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    let products = await redisCache.recover<Product[]>(
      REDIS_CACHE_PRODUCT_LIST,
    );
    if (!products) {
      products = await productRepository.find();
      await redisCache.save(REDIS_CACHE_PRODUCT_LIST, products);
    }

    return products;
  }
}
