import * as express from "express";
import * as controller from "../controllers/localitzacions.controller";
import { isJuntaDirectiva, verifyAccessToken } from "../middleware/auth-jwt";

const router = express.Router();

router
  .route("/")
  .post([verifyAccessToken, isJuntaDirectiva], controller.localitzacions_post);

router.route("/tipus-vies").get(controller.localitzacions_tipusvies_get);

router.route("/ciutats").get(controller.localitzacions_ciutats_get);

router.route("/provincies").get(controller.localitzacions_provincies_get);

router.route("/paisos").get(controller.localitzacions_paisos_get);

router.route("/:id").get(controller.localitzacions_detall);

export default router;
