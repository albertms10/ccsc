const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/projectes.controller");

module.exports = (app) => {
  app.get(
    "/api/projectes/count",
    [authJWT.verifyToken],
    controller.projectes_count
  );

  app.get(
    "/api/projectes/historial",
    [authJWT.verifyToken, authJWT.isJuntaDirectiva],
    controller.projectes_historial
  );
};
