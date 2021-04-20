import { container } from "tsyringe";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import CustomerController from "../controllers/CustomerController";
import Authenticate from "@shared/infra/http/middlewares/Authenticate";

const customersRouter = Router();
const authenticate = container.resolve(Authenticate);
customersRouter.use(authenticate.isAuthenticated);

customersRouter.get("/", CustomerController.index);

customersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  CustomerController.show,
);

customersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  CustomerController.create,
);

customersRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  CustomerController.update,
);

customersRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  CustomerController.delete,
);

export default customersRouter;
