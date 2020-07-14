const express = require("express");
const controller = require("../controllers/titulars.controller");

const router = express.Router();

router.route("/").get(controller.titulars_get);

module.exports = router;
