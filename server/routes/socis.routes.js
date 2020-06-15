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
    "/api/socis/:id/formacions",
    [authJWT.verifyAccessToken],
    controller.socis_detall_formacions
  );

  app.get(
    "/api/socis/:id/projectes",
    [authJWT.verifyAccessToken],
    controller.socis_detall_projectes
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

  app.get(
    "/api/socis/:id/activitat",
    [authJWT.verifyAccessToken, authJWT.isAuthorOrJuntaDirectiva],
    controller.socis_detall_activitat
  );

  app.post(
    "/api/socis/:id/alta",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.socis_detall_alta
  );

  app.put(
    "/api/socis/:id/baixa",
    [authJWT.verifyAccessToken, authJWT.isAuthorOrJuntaDirectiva],
    controller.socis_detall_baixa
  );

  app.get(
    "/api/socis/:id/propers-assajos",
    [authJWT.verifyAccessToken, authJWT.isAuthorOrJuntaDirectiva],
    controller.socis_detall_propersassajos
  )
};
