const express = require("express");
const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/assajos.controller");

const router = express.Router();

router
  .route("/")
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_post
  );

router
  .route("/count")
  .get([authJWT.verifyAccessToken], controller.assajos_count);

router
  .route("/historial")
  .get([authJWT.verifyAccessToken], controller.assajos_historial);

router
  .route("/assistencia")
  .get(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_assistencia
  );

router
  .route("/:id")
  .get([authJWT.verifyAccessToken], controller.assajos_detall)
  .delete(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_delete
  );

router
  .route("/:id/moviments")
  .get([authJWT.verifyAccessToken], controller.assajos_detall_moviments_get)
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_detall_moviments_post
  );

router
  .route("/:id_assaig/moviments/:id_moviment")
  .delete(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_detall_moviments_delete
  );

router
  .route("/:id/projectes")
  .get([authJWT.verifyAccessToken], controller.assajos_detall_projectes_get)
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_detall_projectes_post
  );

router
  .route("/:id_assaig/projectes/:id_projecte")
  .delete(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_detall_projectes_delete
  );

router
  .route("/:id/formacions")
  .get([authJWT.verifyAccessToken], controller.assajos_detall_formacions_get)
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_detall_formacions_post
  );

router
  .route("/:id_assaig/formacions/:id_formacio")
  .delete(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_detall_formacions_delete
  );

router
  .route("/:id/convocats")
  .get([authJWT.verifyAccessToken], controller.assajos_detall_convocats);

router
  .route("/:id/veus")
  .get([authJWT.verifyAccessToken], controller.assajos_detall_veus_get)
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_detall_veus_post
  );

router
  .route("/:id_assaig/veus/:id_veu")
  .delete(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.assajos_detall_veus_delete
  );

module.exports = router;
