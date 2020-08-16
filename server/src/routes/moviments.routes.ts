import * as express from "express";
import * as controller from "../controllers/moviments.controller";
import { verifyAccessToken } from "../middleware/auth-jwt";

const router = express.Router();

router.route("/").get(controller.moviments_get).post(controller.moviments_post);

router
  .route("/:id")
  .get(controller.moviments_detall)
  .delete(controller.moviments_detall_delete);

router
  .route("/:id/fragments")
  .get([verifyAccessToken], controller.moviments_detall_fragments);

export default router;
