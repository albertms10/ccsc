const express = require("express");
const controller = require("../controllers/establiments.controller");

const router = express.Router();

router.route("/").get(controller.establiments_get);

router
  .route("/:id/esdeveniments")
  .get(controller.establiments_detall_esdeveniments);

module.exports = router;
