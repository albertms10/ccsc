const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/associacio.controller");

module.exports = (app) => {
  app.get(
    "/api/associacio",
    [authJWT.verifyAccessToken],
    controller.associacio_get
  );

  app.get(
    "/api/associacio/proteccio-dades",
    controller.associacio_protecciodades
  );
};
