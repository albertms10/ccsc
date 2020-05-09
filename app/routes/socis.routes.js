const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/socis.controller");

module.exports = (app) => {
  app.get(
    "/api/socis/count",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_count
  );

  app.get(
    "/api/socis/historial",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_historial
  );

  app.get(
    "/api/socis/:id",
    [authJWT.verifyAccessToken],
    controller.socis_detall
  );

  app.get(
    "/api/socis",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_get
  );

  app.post(
    "/api/socis",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_post
  );

  app.delete(
    "/api/socis/:id",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_delete
  );

  app.put(
    "/api/socis/:id/accepta-proteccio-dades",
    [authJWT.verifyAccessToken, authJWT.isAuthor],
    controller.socis_detall_acceptaprotecciodades_put
  );

  app.put(
    "/api/socis/:id/accepta-drets-imatge",
    [authJWT.verifyAccessToken, authJWT.isAuthor],
    controller.socis_detall_acceptadretsimatge_put
  );
};
