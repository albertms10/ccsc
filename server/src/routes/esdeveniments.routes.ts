import * as express from "express";
import * as controller from "../controllers/esdeveniments.controller";
import * as authJWT from "../middleware/auth-jwt";

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

export default router;
