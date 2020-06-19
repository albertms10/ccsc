const express = require("express");
const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/localitzacions.controller");

const router = express.Router();

router
  .route("/")
  .post(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.localitzacions_post
  );

router.route("/tipus-vies").get(controller.localitzacions_tipusvies_get);

router.route("/ciutats").get(controller.localitzacions_ciutats_get);

router.route("/provincies").get(controller.localitzacions_provincies_get);

router.route("/paisos").get(controller.localitzacions_paisos_get);

router.route("/:id").get(controller.localitzacions_detall);

module.exports = router;
