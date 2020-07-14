import * as express from "express";
import * as controller from "../controllers/usuaris.controller";

const router = express.Router();

router
  .route("/:username/first-available-num")
  .get(controller.usuaris_detall_firstavailablenum);

export default router;
