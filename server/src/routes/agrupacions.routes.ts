import * as express from "express";
import * as controller from "../controllers/agrupacions.controller";
import * as authJWT from "../middleware/auth-jwt";

const router = express.Router();

router.route("/").get([authJWT.verifyAccessToken], controller.agrupacions_get);

router.route("/avisos/:name").get(controller.agrupacions_avisos_detall);

router
  .route("/cursos")
  .get([authJWT.verifyAccessToken], controller.agrupacions_cursos);

export default router;
