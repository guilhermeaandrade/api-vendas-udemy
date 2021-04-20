import { inject, injectable } from "tsyringe";
import redisCache from "@shared/cache/RedisCache";
import {
  REDIS_CACHE_PRODUCT_LIST,
  REDIS_CACHE_PRODUCT_SHOW,
} from "@shared/constants";
import { IFindProduct } from "../domain/models/IFindProduct";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteProductsService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id }: IFindProduct): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new AppError("Product not found.", 404);

    await this.productRepository.remove(product);
    await this.invalidateCache();
  }

  private async invalidateCache(): Promise<void> {
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_LIST);
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_SHOW);
  }
}

export default DeleteProductsService;
