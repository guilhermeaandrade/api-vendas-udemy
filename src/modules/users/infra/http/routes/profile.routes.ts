import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();

profileRouter.use(isAuthenticated);
profileRouter.get("/", ProfileController.show);
profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      password: Joi.string().optional(),
      passwordConfirmation: Joi.string()
        .valid(Joi.ref("password"))
        .when("password", { is: Joi.exist(), then: Joi.required() }),
    },
  }),
  ProfileController.update,
);

export default profileRouter;
