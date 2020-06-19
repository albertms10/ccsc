const express = require("express");
const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/obres.controller");

const router = express.Router();

router
  .route("/")
  .get(controller.obres_get)
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.obres_post
  );

router.route("/idiomes").get(controller.obres_idiomes);

router.route("/moviments").get(controller.obres_moviments)

router
  .route("/:id")
  .get(controller.obres_detall)
  .delete(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.obres_delete
  );

router
  .route("/:id/moviments")
  .get([authJWT.verifyAccessToken], controller.obres_detall_moviments)
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.obres_detall_moviments_post
  );

module.exports = router;
