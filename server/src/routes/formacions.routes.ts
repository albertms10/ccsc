import * as express from "express";
import * as controller from "../controllers/formacions.controller";
import { verifyAccessToken } from "../middleware/auth-jwt";

const router = express.Router();

router.route("/:id").get([verifyAccessToken], controller.formacions_detall);

router
  .route("/:id/esdeveniments")
  .get([verifyAccessToken], controller.formacions_detall_esdeveniments);

router
  .route("/:id/concerts")
  .get([verifyAccessToken], controller.formacions_detall_concerts);

router
  .route("/:id/projectes")
  .get([verifyAccessToken], controller.formacions_detall_projectes);

router
  .route("/:id/membres")
  .get([verifyAccessToken], controller.formacions_detall_membres);

export default router;
