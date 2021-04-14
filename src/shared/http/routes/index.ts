import { Router } from "express";
import productsRouter from "@modules/products/routes/product.routes";
import usersRouter from "@modules/users/routes/user.routes";
import sessionRouter from "@modules/users/routes/session.routes";
import passwordRouter from "@modules/users/routes/password.routes";

const routes = Router();

routes.use("/v1/sessions", sessionRouter);
routes.use("/v1/products", productsRouter);
routes.use("/v1/users", usersRouter);
routes.use("/v1/password", passwordRouter);

export default routes;
