const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/socis.controller");

module.exports = (app) => {
  app.post("/api/alta-soci", [authJWT.verifyEmailToken], controller.socis_post);

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

  app.delete(
    "/api/socis/:id",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_delete
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

  app.get(
    "/api/socis/:id/agrupacions",
    [authJWT.verifyAccessToken],
    controller.socis_detall_agrupacions
  );

  app.get(
    "/api/socis/:id/assajos",
    [authJWT.verifyAccessToken],
    controller.socis_detall_assajos
  );

  app.get(
    "/api/socis/:id/acceptacions",
    [authJWT.verifyAccessToken, authJWT.isAuthorOrJuntaDirectiva],
    controller.socis_detall_acceptacions_get
  );

  app.put(
    "/api/socis/:id/acceptacions",
    [authJWT.verifyAccessToken, authJWT.isAuthor],
    controller.socis_detall_acceptacions_put
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
