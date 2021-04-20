import { inject, injectable } from "tsyringe";
import redisCache from "@shared/cache/RedisCache";
import { REDIS_CACHE_PRODUCT_SHOW } from "@shared/constants";
import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IFindProduct } from "../domain/models/IFindProduct";
import { IProduct } from "../domain/models/IProduct";

@injectable()
class ShowProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id }: IFindProduct): Promise<IProduct> {
    let product = await redisCache.recover<Product>(REDIS_CACHE_PRODUCT_SHOW);
    if (!product) {
      product = await this.productRepository.findById(id);
      if (!product) {
        throw new AppError("Product not found.", 404);
      }

      await redisCache.save(REDIS_CACHE_PRODUCT_SHOW, product);
    }

    return product;
  }
}

export default ShowProductService;
