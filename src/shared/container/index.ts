import { container } from "tsyringe";
import "@modules/users/providers";
import "../providers/MailProvider";

import CustomerRepository from "@modules/customers/infra/typeorm/repositories/CustomerRepository";
import { ICustomerRepository } from "@modules/customers/domain/repositories/ICustomerRepository";

import ProductRepository from "@modules/products/infra/typeorm/repositories/ProductRepository";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";

import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";

import UserTokenRepository from "@modules/users/infra/typeorm/repositories/UserTokenRepository";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";

import { IOrderRepository } from "@modules/orders/domain/respositories/IOrderRepository";
import OrderRepository from "@modules/orders/infra/typeorm/repositories/OrderRepository";

container.registerSingleton<ICustomerRepository>(
  "CustomerRepository",
  CustomerRepository,
);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository,
);

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository,
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IOrderRepository>(
  "OrderRepository",
  OrderRepository,
);
