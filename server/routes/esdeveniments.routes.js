const express = require("express");
const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/esdeveniments.controller");

const router = express.Router();

router.route("/").get(controller.esdeveniments_get);

router
  .route("/estats-confirmacio")
  .get([authJWT.verifyAccessToken], controller.esdeveniments_estatsconfirmacio);

router
  .route("/:id/assistents")
  .get(
    [authJWT.verifyAccessToken],
    controller.esdeveniments_detall_assistents_get
  )
  .put(
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.esdeveniments_detall_assistents_put
  );

module.exports = router;
