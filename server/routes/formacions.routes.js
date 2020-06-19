const express = require("express");
const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/formacions.controller");

const router = express.Router();

router
  .route("/:id")
  .get([authJWT.verifyAccessToken], controller.formacions_detall);

router
  .route("/:id/esdeveniments")
  .get([authJWT.verifyAccessToken], controller.formacions_detall_esdeveniments);

router
  .route("/:id/concerts")
  .get([authJWT.verifyAccessToken], controller.formacions_detall_concerts);

router
  .route("/:id/projectes")
  .get([authJWT.verifyAccessToken], controller.formacions_detall_projectes);

router
  .route("/:id/integrants")
  .get([authJWT.verifyAccessToken], controller.formacions_detall_integrants);

module.exports = router;
