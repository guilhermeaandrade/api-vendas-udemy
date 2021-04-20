import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { IFindProduct } from "@modules/products/domain/models/IFindProduct";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { getRepository, In, Repository } from "typeorm";
import Product from "../entities/Product";

export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async listProducts(): Promise<IProduct[]> {
    return await this.ormRepository.find();
  }

  public async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const product = this.ormRepository.create({ name, price, quantity });
    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllByIds(products: IFindProduct[]): Promise<IProduct[]> {
    const productIds = products.map(product => product.id);
    const existentProducts = await this.ormRepository.find({
      where: { id: In(productIds) },
    });

    return existentProducts;
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
    });

    return product;
  }
}
