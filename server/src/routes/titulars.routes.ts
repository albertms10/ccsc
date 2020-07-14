import * as express from "express";
import * as controller from "../controllers/titulars.controller";

const router = express.Router();

router.route("/").get(controller.titulars_get);

export default router;
