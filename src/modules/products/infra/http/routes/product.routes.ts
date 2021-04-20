import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ProductController from "../controllers/ProductController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";

const productsRouter = Router();
productsRouter.use(isAuthenticated);

productsRouter.get("/", ProductController.index);

productsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().integer().positive().required(),
    },
  }),
  ProductController.create,
);

productsRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ProductController.show,
);

productsRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().integer().positive().required(),
    },
  }),
  ProductController.update,
);

productsRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ProductController.delete,
);

export default productsRouter;
