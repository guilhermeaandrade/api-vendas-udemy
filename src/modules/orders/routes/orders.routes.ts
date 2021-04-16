import { Router } from "express";
import OrderController from "../controllers/OrderController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import Joi from "joi";

const ordersRouter = Router();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  OrderController.show,
);

ordersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customerId: Joi.string().uuid().required(),
      // products: Joi.required(),
      products: Joi.array().items({
        id: Joi.string().required(),
        quantity: Joi.number().integer().positive().required(),
      }),
    },
  }),
  OrderController.create,
);

export default ordersRouter;
