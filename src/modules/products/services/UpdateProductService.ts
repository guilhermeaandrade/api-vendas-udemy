import { inject, injectable } from "tsyringe";
import redisCache from "@shared/cache/RedisCache";
import {
  REDIS_CACHE_PRODUCT_LIST,
  REDIS_CACHE_PRODUCT_SHOW,
} from "@shared/constants";
import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import { IProductRepository } from "../domain/repositories/IProductRepository";

@injectable()
class UpdateProductsService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new AppError("Product not found", 404);

    const productExists = await this.productRepository.findByName(name);
    if (productExists?.id !== id)
      throw new AppError("Product already exists", 422);

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productRepository.save(product);
    await this.invalidateCache();

    return product;
  }

  private async invalidateCache(): Promise<void> {
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_LIST);
    await redisCache.invalidate(REDIS_CACHE_PRODUCT_SHOW);
  }
}

export default UpdateProductsService;
