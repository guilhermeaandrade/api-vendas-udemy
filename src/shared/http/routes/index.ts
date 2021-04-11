import { Request, Response, Router } from "express";
import productsRouter from "@modules/products/routes/product.routes";

const routes = Router();

routes.use("/v1/products", productsRouter);

export default routes;
