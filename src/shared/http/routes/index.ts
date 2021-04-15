import { Router } from "express";
import productsRouter from "@modules/products/routes/product.routes";
import usersRouter from "@modules/users/routes/user.routes";
import profilesRouter from "@modules/users/routes/profile.routes";
import sessionRouter from "@modules/users/routes/session.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import customersRouter from "@modules/customers/routes/customers.routes";

const routes = Router();

routes.use("/v1/sessions", sessionRouter);
routes.use("/v1/products", productsRouter);
routes.use("/v1/users", usersRouter);
routes.use("/v1/profiles", profilesRouter);
routes.use("/v1/passwords", passwordRouter);
routes.use("/v1/customers", customersRouter);

export default routes;
