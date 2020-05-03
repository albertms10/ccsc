const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/associacio.controller");

module.exports = (app) => {
  app.get("/api/associacio", [authJWT.verifyToken], controller.associacio_get);

  app.get(
    "/api/associacio/agrupacions",
    [authJWT.verifyToken],
    controller.associacio_agrupacions
  );
};
