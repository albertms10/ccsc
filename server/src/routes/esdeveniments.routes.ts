import * as express from "express";
import * as controller from "../controllers/esdeveniments.controller";
import {
  isAuthorOrBoardOfDirectors,
  verifyAccessToken,
} from "../middleware/auth-jwt";

const router = express.Router();

router.route("/").get(controller.esdeveniments_get);

router
  .route("/estats-confirmacio")
  .get([verifyAccessToken], controller.esdeveniments_estatsconfirmacio);

router
  .route("/:id/assistents")
  .get([verifyAccessToken], controller.esdeveniments_detall_assistents_get);

router
  .route("/:id_esdeveniment/assistents/:id_persona")
  .put(
    [verifyAccessToken, isAuthorOrBoardOfDirectors],
    controller.esdeveniments_detall_assistents_put
  );

export default router;
