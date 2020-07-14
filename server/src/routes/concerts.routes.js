const express = require("express");
const controller = require("../controllers/concerts.controller");

const router = express.Router();

router.route("/count").get(controller.concerts_count);

router.route("/historial").get(controller.concerts_historial);

module.exports = router;
