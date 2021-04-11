import { Router } from "express";
import productsRouter from "@modules/products/routes/product.routes";
import usersRouter from "@modules/users/routes/user.routes";
import sessionRouter from "@modules/users/routes/session.routes";

const routes = Router();

routes.use("/v1/sessions", sessionRouter);
routes.use("/v1/products", productsRouter);
routes.use("/v1/users", usersRouter);

export default routes;
