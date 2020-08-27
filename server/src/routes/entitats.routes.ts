import * as express from "express";
import * as controller from "../controllers/entitats.controller";
import { verifyAccessToken } from "../middleware/auth-jwt";

const router = express.Router();

router.route("/").get([verifyAccessToken], controller.entitats_get);

router
  .route("/cursos")
  .get([verifyAccessToken], controller.entitats_detall_cursos);

router.route("/avisos/:name").get(controller.entitats_detall_avisos_detall);

router.route("/:id").get([verifyAccessToken], controller.entitats_detall);

export default router;
