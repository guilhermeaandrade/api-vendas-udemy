import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import { container } from "tsyringe";
import multer from "multer";
import uploadConfig from "@config/upload";
import Authenticate from "@shared/infra/http/middlewares/Authenticate";
import UserController from "../controllers/UserController";
import UserAvatarController from "../controllers/UserAvatarController";

const routes = Router();
const upload = multer(uploadConfig.multer);
const authenticate = container.resolve(Authenticate);

routes.get("/", authenticate.isAuthenticated, UserController.index);

routes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UserController.create,
);

routes.patch(
  "/avatar",
  authenticate.isAuthenticated,
  upload.single("avatar"),
  UserAvatarController.update,
);

export default routes;
