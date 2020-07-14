import * as express from "express";
import * as controller from "../controllers/establiments.controller";

const router = express.Router();

router.route("/").get(controller.establiments_get);

router
  .route("/:id/esdeveniments")
  .get(controller.establiments_detall_esdeveniments);

export default router;
