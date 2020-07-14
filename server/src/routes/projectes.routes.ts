import * as express from "express";
import * as controller from "../controllers/projectes.controller";
import * as authJWT from "../middleware/auth-jwt";

const router = express.Router();

router.route("/").post([authJWT.verifyAccessToken], controller.projectes_post);

router
  .route("/count")
  .get([authJWT.verifyAccessToken], controller.projectes_count);

router
  .route("/historial")
  .get([authJWT.verifyAccessToken], controller.projectes_historial);

router
  .route("/check-inicials/:inicials")
  .get([authJWT.verifyAccessToken], controller.projectes_checkinicials);

router
  .route("/:id")
  .get([authJWT.verifyAccessToken], controller.projectes_detall)
  .delete(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.projectes_delete
  );

router
  .route("/:id/concerts")
  .get([authJWT.verifyAccessToken], controller.projectes_detall_concerts);

router
  .route("/:id/participants")
  .get([authJWT.verifyAccessToken], controller.projectes_detall_participants);

router
  .route("/:id/assajos")
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.projectes_detall_assajos_post
  );

router
  .route("/:id/moviments")
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.projectes_detall_moviments_post
  );

router
  .route("/:id_projecte/moviments/:id_moviment")
  .delete(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.projectes_detall_moviments_delete
  );

export default router;
