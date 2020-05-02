const controller = require("../controllers/socis.controller");

module.exports = (app) => {
  app.get("/api/socis/count", controller.socis_count);

  app.get("/api/socis/historial", controller.socis_historial);

  app.get("/api/socis/:id", controller.socis_detall);

  app.get("/api/socis", controller.socis_get);

  app.post("/api/socis", controller.socis_post);

  app.delete("/api/socis/:id", controller.socis_delete);
};
