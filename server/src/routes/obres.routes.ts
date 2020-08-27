import * as express from "express";
import * as controller from "../controllers/obres.controller";
import { isBoardOfDirectors, verifyAccessToken } from "../middleware/auth-jwt";

const router = express.Router();

router
  .route("/")
  .get(controller.obres_get)
  .post([verifyAccessToken, isBoardOfDirectors], controller.obres_post);

router.route("/idiomes").get(controller.obres_idiomes);

router
  .route("/:id")
  .get(controller.obres_detall)
  .delete([verifyAccessToken, isBoardOfDirectors], controller.obres_delete);

router
  .route("/:id/moviments")
  .get([verifyAccessToken], controller.obres_detall_moviments);

export default router;
