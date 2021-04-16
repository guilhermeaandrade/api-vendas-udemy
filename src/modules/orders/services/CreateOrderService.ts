import Customer from "@modules/customers/typeorm/entities/Customer";
import CustomerRepository from "@modules/customers/typeorm/repositories/CustomerRepository";
import Product from "@modules/products/typeorm/entities/Product";
import ProductRepository from "@modules/products/typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository, getManager } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrderRepository from "../typeorm/repositories/OrderRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customerId: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customerId, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const productRepository = getCustomRepository(ProductRepository);
    const entityManager = getManager();

    const customer = await this.validateCustomer(customerId);
    const existsProducts = await this.validateProducts(
      products,
      productRepository,
    );
    this.validateProductQuantity(products, existsProducts);

    const serializedProducts = products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    return await entityManager.transaction(async manager => {
      const order = await orderRepository.createOrder({
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

      await productRepository.save(updatedProductQuantity);

      return order;
    });
  }

  private async validateCustomer(customerId: string): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(customerId);
    if (!customer) {
      throw new AppError("Could not find any customer with the given id.", 404);
    }

    return customer;
  }

  private async validateProducts(
    iProducts: IProduct[],
    repository: ProductRepository,
  ): Promise<Product[]> {
    const products = await repository.findAllByIds(iProducts);
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
    iProducts: IProduct[],
    products: Product[],
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
