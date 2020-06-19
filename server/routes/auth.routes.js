const express = require("express");
const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.route("/sign-in").post(controller.signin);

router.route("/email-espera").post(controller.email_espera);

router
  .route("/user")
  .get(
    [
      (req, res, next) =>
        authJWT.verifyAccessToken(req, res, next, { hideMessage: true }),
    ],
    controller.userInfo
  );

module.exports = router;
