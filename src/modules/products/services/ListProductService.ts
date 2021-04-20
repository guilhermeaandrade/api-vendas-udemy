import { inject, injectable } from "tsyringe";
import Product from "../infra/typeorm/entities/Product";
import redisCache from "@shared/cache/RedisCache";
import { REDIS_CACHE_PRODUCT_LIST } from "@shared/constants";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IProduct } from "../domain/models/IProduct";

@injectable()
class ListProductsService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository,
  ) {}

  public async execute(): Promise<IProduct[]> {
    let products = await redisCache.recover<Product[]>(
      REDIS_CACHE_PRODUCT_LIST,
    );
    if (!products) {
      products = await this.productRepository.listProducts();
      await redisCache.save(REDIS_CACHE_PRODUCT_LIST, products);
    }

    return products;
  }
}

export default ListProductsService;
