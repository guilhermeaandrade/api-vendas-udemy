import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";

export class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    return await productRepository.find();
  }
}
