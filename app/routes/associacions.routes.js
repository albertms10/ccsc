const controller = require("../controllers/associacions.controller");

module.exports = (app) => {
  app.get("/api/associacio", controller.associacio_get);

  app.get("/api/associacio/agrupacions", controller.associacio_agrupacions);
};
