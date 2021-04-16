import redisCache from "@shared/cache/RedisCache";
import {
  REDIS_CACHE_PRODUCT_LIST,
  REDIS_CACHE_PRODUCT_SHOW,
} from "@shared/constants";
import { getCustomRepository } from "typeorm";
import ProductRepository from "../typeorm/repositories/ProductRepository";
import { ShowProductsService } from "./ShowProductService";

interface IDeleteRequest {
  id: string;
}

export class DeleteProductsService {
  public async execute({ id }: IDeleteRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await new ShowProductsService().execute({ id });

    await productRepository.remove(product);
    await this.invalidateCache();
  }

  private async invalidateCache(): Promise<void> {
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_LIST);
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_SHOW);
  }
}
