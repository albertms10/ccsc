const express = require("express");
const controller = require("../controllers/usuaris.controller");

const router = express.Router();

router
  .route("/:username/first-available-num")
  .get(controller.usuaris_detall_firstavailablenum);

module.exports = router;
