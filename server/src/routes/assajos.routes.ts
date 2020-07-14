import * as express from "express";
import * as controller from "../controllers/assajos.controller";
import { isJuntaDirectiva, verifyAccessToken } from "../middleware/auth-jwt";

const router = express.Router();

router
  .route("/")
  .post([verifyAccessToken, isJuntaDirectiva], controller.assajos_post);

router.route("/count").get([verifyAccessToken], controller.assajos_count);

router
  .route("/historial")
  .get([verifyAccessToken], controller.assajos_historial);

router
  .route("/assistencia")
  .get([verifyAccessToken, isJuntaDirectiva], controller.assajos_assistencia);

router
  .route("/:id")
  .get([verifyAccessToken], controller.assajos_detall)
  .delete([verifyAccessToken, isJuntaDirectiva], controller.assajos_delete);

router
  .route("/:id/moviments")
  .get([verifyAccessToken], controller.assajos_detall_moviments_get)
  .post(
    [verifyAccessToken, isJuntaDirectiva],
    controller.assajos_detall_moviments_post
  );

router
  .route("/:id_assaig/moviments/:id_moviment")
  .delete(
    [verifyAccessToken, isJuntaDirectiva],
    controller.assajos_detall_moviments_delete
  );

router
  .route("/:id/projectes")
  .get([verifyAccessToken], controller.assajos_detall_projectes_get)
  .post(
    [verifyAccessToken, isJuntaDirectiva],
    controller.assajos_detall_projectes_post
  );

router
  .route("/:id_assaig/projectes/:id_projecte")
  .delete(
    [verifyAccessToken, isJuntaDirectiva],
    controller.assajos_detall_projectes_delete
  );

router
  .route("/:id/formacions")
  .get([verifyAccessToken], controller.assajos_detall_formacions_get)
  .post(
    [verifyAccessToken, isJuntaDirectiva],
    controller.assajos_detall_formacions_post
  );

router
  .route("/:id_assaig/formacions/:id_formacio")
  .delete(
    [verifyAccessToken, isJuntaDirectiva],
    controller.assajos_detall_formacions_delete
  );

router
  .route("/:id/convocats")
  .get([verifyAccessToken], controller.assajos_detall_convocats);

router
  .route("/:id/veus")
  .get([verifyAccessToken], controller.assajos_detall_veus_get)
  .post(
    [verifyAccessToken, isJuntaDirectiva],
    controller.assajos_detall_veus_post
  );

router
  .route("/:id_assaig/veus/:id_veu")
  .delete(
    [verifyAccessToken, isJuntaDirectiva],
    controller.assajos_detall_veus_delete
  );

export default router;
