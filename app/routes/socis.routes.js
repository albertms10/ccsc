const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/socis.controller");

module.exports = (app) => {
  app.get(
    "/api/socis/count",
    [authJWT.verifyToken, authJWT.isJuntaDirectiva],
    controller.socis_count
  );

  app.get(
    "/api/socis/historial",
    [authJWT.verifyToken, authJWT.isJuntaDirectiva],
    controller.socis_historial
  );

  app.get("/api/socis/:id", [authJWT.verifyToken], controller.socis_detall);

  app.get(
    "/api/socis",
    [authJWT.verifyToken, authJWT.isJuntaDirectiva],
    controller.socis_get
  );

  app.post(
    "/api/socis",
    [authJWT.verifyToken, authJWT.isJuntaDirectiva],
    controller.socis_post
  );

  app.delete(
    "/api/socis/:id",
    [authJWT.verifyToken, authJWT.isJuntaDirectiva],
    controller.socis_delete
  );

  app.put(
    "/api/socis/:id/accepta-drets-imatge",
    [authJWT.verifyToken],
    controller.socis_detall_acceptadretsimatge_put
  );
};
