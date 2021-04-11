import { Router } from 'express';
import { celebrate, Joi, Segments } from "celebrate";
import ProductController from "../controllers/ProductController";

const routes = Router();

routes.get("/", ProductController.index);
routes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().integer().positive().required(),
    }
  }),
  ProductController.create
);

routes.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  ProductController.show
);

routes.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().integer().positive().required(),
    },
  }),
  ProductController.update
);

routes.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  ProductController.delete
);

export default routes;
