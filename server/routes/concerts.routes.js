const controller = require("../controllers/concerts.controller");

module.exports = (app) => {
  app.get("/api/concerts/count", controller.concerts_count);

  app.get("/api/concerts/historial", controller.concerts_historial);
};
