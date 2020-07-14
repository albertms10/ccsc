import * as express from "express";
import * as controller from "../controllers/auth.controller";
import * as authJWT from "../middleware/auth-jwt";

const router = express.Router();

router.route("/sign-in").post(controller.signin);

router.route("/email-espera").post(controller.email_espera);

router
  .route("/user")
  .get([authJWT.verifyAccessTokenHidden], controller.userInfo);

export default router;
