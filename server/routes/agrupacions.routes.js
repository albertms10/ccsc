const express = require("express");
const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/agrupacions.controller");

const router = express.Router();

router.route("/").get([authJWT.verifyAccessToken], controller.agrupacions_get);

router.route("/avisos/:id").get(controller.agrupacions_avisos_detall);

router
  .route("/cursos")
  .get([authJWT.verifyAccessToken], controller.agrupacions_cursos);

module.exports = router;
