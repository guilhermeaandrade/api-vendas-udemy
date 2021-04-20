import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
import ProductController from "../controllers/ProductController";
import Authenticate from "@shared/infra/http/middlewares/Authenticate";

const productsRouter = Router();
const authenticate = container.resolve(Authenticate);
productsRouter.use(authenticate.isAuthenticated);

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
