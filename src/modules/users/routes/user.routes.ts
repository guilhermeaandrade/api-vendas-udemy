import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import multer from "multer";
import uploadConfig from "@config/upload";

import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import UserController from "../controllers/UserController";
import UserAvatarController from "../controllers/UserAvatarController";

const routes = Router();
const upload = multer(uploadConfig.multer);

routes.get("/", isAuthenticated, UserController.index);

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
  isAuthenticated,
  upload.single("avatar"),
  UserAvatarController.update,
);

export default routes;
