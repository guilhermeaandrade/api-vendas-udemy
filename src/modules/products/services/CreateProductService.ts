import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import redisCache from "@shared/cache/RedisCache";
import {
  REDIS_CACHE_PRODUCT_LIST,
  REDIS_CACHE_PRODUCT_SHOW,
} from "@shared/constants";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { IProduct } from "../domain/models/IProduct";

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productRepository.findByName(name);
    if (productExists)
      throw new AppError("There is already one product with this name", 422);

    const product = this.productRepository.create({ name, price, quantity });
    await this.invalidateCache();

    return product;
  }

  private async invalidateCache(): Promise<void> {
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_LIST);
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_SHOW);
  }
}

export default CreateProductService;
