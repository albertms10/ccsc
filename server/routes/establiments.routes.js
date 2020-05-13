const controller = require("../controllers/establiments.controller");

module.exports = (app) => {
  app.get("/api/establiments", controller.establiments_get);

  app.get(
    "/api/establiments/:id/esdeveniments",
    controller.establiments_detall_esdeveniments
  );
};
