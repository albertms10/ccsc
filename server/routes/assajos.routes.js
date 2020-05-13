const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/assajos.controller");

module.exports = (app) => {
  app.get(
    "/api/assajos/count",
    [authJWT.verifyAccessToken],
    controller.assajos_count
  );

  app.get(
    "/api/assajos/historial",
    [authJWT.verifyAccessToken],
    controller.assajos_historial
  );
};
