import { ICreateProduct } from "../models/ICreateProduct";
import { IFindProduct } from "../models/IFindProduct";
import { IProduct } from "../models/IProduct";
import { IUpdateQuantityProduct } from "../models/IUpdateQuantityProduct";

export interface IProductRepository {
  findById(id: string): Promise<IProduct | undefined>;
  findByName(name: string): Promise<IProduct | undefined>;
  findAllByIds(products: IFindProduct[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  listProducts(): Promise<IProduct[]>;
  updateQuantity(items: IUpdateQuantityProduct[]): Promise<void>;
}
