import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import { ShowProductsService } from "./ShowProductService";

interface IDeleteRequest {
  id: string;
}

export class DeleteProductsService {
  public async execute({ id }: IDeleteRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await new ShowProductsService().execute({ id });

    await productRepository.remove(product);
  }
}
