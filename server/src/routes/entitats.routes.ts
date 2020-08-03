import * as express from "express";
import * as controller from "../controllers/entitats.controller";
import { verifyAccessToken } from "../middleware/auth-jwt";

const router = express.Router();

router.route("/").get([verifyAccessToken], controller.entitats_get);

router.route("/:id").get([verifyAccessToken], controller.entitats_detall);

router.route("/avisos/:name").get(controller.entitats_detall_avisos_detall);

router.route("/cursos").get([verifyAccessToken], controller.entitats_detall_cursos);

export default router;
