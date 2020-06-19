const express = require("express");
const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/socis.controller");

const router = express.Router();

router
  .route("/")
  .get(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_get
  )
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_post
  );

router.route("/alta").post([authJWT.verifyEmailToken], controller.socis_post);

router
  .route("/count")
  .get(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_count
  );

router
  .route("/historial")
  .get(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_historial
  );

router
  .route("/:id")
  .get([authJWT.verifyAccessToken], controller.socis_detall)
  .delete(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_delete
  );

router
  .route("/:id/formacions")
  .get([authJWT.verifyAccessToken], controller.socis_detall_formacions);

router
  .route("/:id/projectes")
  .get([authJWT.verifyAccessToken], controller.socis_detall_projectes);

router
  .route("/:id/assajos")
  .get([authJWT.verifyAccessToken], controller.socis_detall_assajos);

router
  .route("/:id/acceptacions")
  .get(
    [authJWT.verifyAccessToken, authJWT.isAuthorOrJuntaDirectiva],
    controller.socis_detall_acceptacions_get
  )
  .put(
    [authJWT.verifyAccessToken, authJWT.isAuthor],
    controller.socis_detall_acceptacions_put
  );

router
  .route("/:id/activitat")
  .get(
    [authJWT.verifyAccessToken, authJWT.isAuthorOrJuntaDirectiva],
    controller.socis_detall_activitat
  );

router
  .route("/:id/alta")
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_detall_alta
  );

router
  .route("/:id/baixa")
  .put(
    [authJWT.verifyAccessToken, authJWT.isAuthorOrJuntaDirectiva],
    controller.socis_detall_baixa
  );

router
  .route("/:id/propers-assajos")
  .get(
    [authJWT.verifyAccessToken, authJWT.isAuthorOrJuntaDirectiva],
    controller.socis_detall_propersassajos
  );

module.exports = router;
