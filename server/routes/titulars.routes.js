const controller = require("../controllers/titulars.controller");

module.exports = (app) => {
  app.get("/api/titulars", controller.titulars_get);
};
