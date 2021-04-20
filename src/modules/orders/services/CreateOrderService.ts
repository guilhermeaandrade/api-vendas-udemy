import { inject, injectable } from "tsyringe";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomerRepository } from "@modules/customers/domain/repositories/ICustomerRepository";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import AppError from "@shared/errors/AppError";
import { IOrder } from "../domain/models/IOrder";
import { IOrderRepository } from "../domain/respositories/IOrderRepository";
import { EntityManager, getManager } from "typeorm";
import {
  ICreateOrderRequest,
  IOrderProductRequest,
} from "../domain/models/ICreateOrder";

@injectable()
class CreateOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,
    @inject("ProductRepository")
    private productRepository: IProductRepository,
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    customerId,
    products,
  }: ICreateOrderRequest): Promise<IOrder> {
    const entityManager = getManager();

    const customer = await this.validateCustomer(customerId);
    const existsProducts = await this.validateProducts(products);
    this.validateProductQuantity(products, existsProducts);

    const serializedProducts = products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    return await entityManager.transaction(async (_manager: EntityManager) => {
      const order = await this.orderRepository.createOrder({
        customer,
        products: serializedProducts,
      });

      const { orderProducts } = order;
      const updatedProductQuantity = orderProducts.map(product => ({
        id: product.productId,
        quantity:
          existsProducts.filter(p => p.id === product.productId)[0].quantity -
          product.quantity,
      }));

      await this.productRepository.updateQuantity(updatedProductQuantity);

      return order;
    });
  }

  private async validateCustomer(customerId: string): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new AppError("Could not find any customer with the given id.", 404);
    }

    return customer;
  }

  private async validateProducts(
    iProducts: IOrderProductRequest[],
  ): Promise<IProduct[]> {
    const products = await this.productRepository.findAllByIds(iProducts);
    if (!products.length) {
      throw new AppError(
        "Could not find any products with the given ids.",
        404,
      );
    }

    const existsProductsIds = products.map(product => product.id);
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
        400,
      );
    }

    return products;
  }

  private validateProductQuantity(
    iProducts: IOrderProductRequest[],
    products: IProduct[],
  ): void {
    const quantityAvailable = iProducts.filter(
      iProduct =>
        products.filter(p => p.id === iProduct.id)[0].quantity <
        iProduct.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`,
      );
    }
  }
}

export default CreateOrderService;
