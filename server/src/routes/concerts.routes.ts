import * as express from "express";
import * as controller from "../controllers/concerts.controller";

const router = express.Router();

router.route("/count").get(controller.concerts_count);

router.route("/historial").get(controller.concerts_historial);

export default router;
