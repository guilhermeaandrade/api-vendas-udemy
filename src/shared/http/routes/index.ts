import { Router } from "express";
import productsRouter from "@modules/products/routes/product.routes";
import usersRouter from "@modules/users/routes/user.routes";
import profilesRouter from "@modules/users/routes/profile.routes";
import sessionRouter from "@modules/users/routes/session.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import customersRouter from "@modules/customers/routes/customers.routes";
import ordersRouter from "@modules/orders/routes/orders.routes";

const routes = Router();

routes.use("/v1/sessions", sessionRouter);
routes.use("/v1/products", productsRouter);
routes.use("/v1/users", usersRouter);
routes.use("/v1/profiles", profilesRouter);
routes.use("/v1/passwords", passwordRouter);
routes.use("/v1/customers", customersRouter);
routes.use("/v1/orders", ordersRouter);

export default routes;
