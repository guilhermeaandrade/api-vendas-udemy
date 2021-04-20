import { ICreateProduct } from "../models/ICreateProduct";
import { IFindProduct } from "../models/IFindProduct";
import { IProduct } from "../models/IProduct";

export interface IProductRepository {
  findById(id: string): Promise<IProduct | undefined>;
  findByName(name: string): Promise<IProduct | undefined>;
  findAllByIds(products: IFindProduct[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  listProducts(): Promise<IProduct[]>;
}
