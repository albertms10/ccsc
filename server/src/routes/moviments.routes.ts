import * as express from "express";
import * as controller from "../controllers/moviments.controller";

const router = express.Router();

router.route("/").get(controller.moviments_get).post(controller.moviments_post);

router
  .route("/:id")
  .get(controller.moviments_detall)
  .delete(controller.moviments_detall_delete);

export default router;
