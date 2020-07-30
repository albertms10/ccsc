import * as express from "express";
import * as controller from "../controllers/auth.controller";
import { verifyAccessTokenHidden } from "../middleware/auth-jwt";

const router = express.Router();

router.route("/sign-in").post(controller.signIn);

router.route("/email-espera").post(controller.emailEspera);

router.route("/user").get([verifyAccessTokenHidden], controller.userInfo);

export default router;
