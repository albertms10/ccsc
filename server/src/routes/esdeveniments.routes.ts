import * as express from "express";
import * as controller from "../controllers/esdeveniments.controller";
import { isJuntaDirectiva, verifyAccessToken } from "../middleware/auth-jwt";

const router = express.Router();

router.route("/").get(controller.esdeveniments_get);

router
  .route("/estats-confirmacio")
  .get([verifyAccessToken], controller.esdeveniments_estatsconfirmacio);

router
  .route("/:id/assistents")
  .get([verifyAccessToken], controller.esdeveniments_detall_assistents_get)
  .put(
    [verifyAccessToken, isJuntaDirectiva],
    controller.esdeveniments_detall_assistents_put
  );

export default router;
