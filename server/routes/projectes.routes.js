const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/projectes.controller");

module.exports = (app) => {
  app.get(
    "/api/projectes/count",
    [authJWT.verifyAccessToken],
    controller.projectes_count
  );

  app.get(
    "/api/projectes/historial",
    [authJWT.verifyAccessToken],
    controller.projectes_historial
  );

  app.get(
    "/api/projectes/check-inicials/:inicials",
    [authJWT.verifyAccessToken],
    controller.projectes_checkinicials
  );

  app.get(
    "/api/projectes/:id",
    [authJWT.verifyAccessToken],
    controller.projectes_detall
  )

  app.post(
    "/api/projectes",
    [authJWT.verifyAccessToken],
    controller.projectes_post
  );

  app.delete(
    "/api/projectes/:id",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.projectes_delete
  );
};
