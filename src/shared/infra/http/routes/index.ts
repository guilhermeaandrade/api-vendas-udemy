import { Router } from "express";
import productsRouter from "@modules/products/infra/http/routes/product.routes";
import usersRouter from "@modules/users/infra/http/routes/user.routes";
import profilesRouter from "@modules/users/infra/http/routes/profile.routes";
import sessionRouter from "@modules/users/infra/http/routes/session.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import customersRouter from "@modules/customers/infra/http/routes/customers.routes";
import ordersRouter from "@modules/orders/infra/http/routes/orders.routes";

const routes = Router();

routes.use("/v1/sessions", sessionRouter);
routes.use("/v1/products", productsRouter);
routes.use("/v1/users", usersRouter);
routes.use("/v1/profiles", profilesRouter);
routes.use("/v1/passwords", passwordRouter);
routes.use("/v1/customers", customersRouter);
routes.use("/v1/orders", ordersRouter);

export default routes;
