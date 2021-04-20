import { Router } from "express";
import { container } from "tsyringe";
import OrderController from "../controllers/OrderController";
import { celebrate, Segments } from "celebrate";
import Joi from "joi";
import Authenticate from "@shared/infra/http/middlewares/Authenticate";

const ordersRouter = Router();
const authenticate = container.resolve(Authenticate);
ordersRouter.use(authenticate.isAuthenticated);

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
      products: Joi.array().items({
        id: Joi.string().required(),
        quantity: Joi.number().integer().positive().required(),
      }),
    },
  }),
  OrderController.create,
);

export default ordersRouter;
