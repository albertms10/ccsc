const controller = require("../controllers/associacio.controller");

module.exports = (app) => {
  app.get("/api/associacio", controller.associacio_get);

  app.get("/api/associacio/agrupacions", controller.associacio_agrupacions);
};
