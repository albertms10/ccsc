import * as express from "express";
import * as controller from "../controllers/projectes.controller";
import { isBoardOfDirectors, verifyAccessToken } from "../middleware/auth-jwt";

const router = express.Router();

router.route("/").post([verifyAccessToken], controller.projectes_post);

router.route("/count").get([verifyAccessToken], controller.projectes_count);

router
  .route("/historial")
  .get([verifyAccessToken], controller.projectes_historial);

router
  .route("/check-inicials/:inicials")
  .get([verifyAccessToken], controller.projectes_checkinicials);

router
  .route("/:id")
  .get([verifyAccessToken], controller.projectes_detall)
  .delete([verifyAccessToken, isBoardOfDirectors], controller.projectes_delete);

router
  .route("/:id/concerts")
  .get([verifyAccessToken], controller.projectes_detall_concerts);

router
  .route("/:id/participants")
  .get([verifyAccessToken], controller.projectes_detall_participants);

router
  .route("/:id/assajos")
  .post(
    [verifyAccessToken, isBoardOfDirectors],
    controller.projectes_detall_assajos_post
  );

router
  .route("/:id/moviments")
  .post(
    [verifyAccessToken, isBoardOfDirectors],
    controller.projectes_detall_moviments_post
  );

router
  .route("/:id_projecte/moviments/:id_moviment")
  .delete(
    [verifyAccessToken, isBoardOfDirectors],
    controller.projectes_detall_moviments_delete
  );

export default router;
