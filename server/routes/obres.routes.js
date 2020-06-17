const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/obres.controller");

module.exports = (app) => {
  app.get("/api/obres", controller.obres_get);

  app.get("/api/obres/idiomes", controller.obres_idiomes);

  app.post(
    "/api/obres",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.obres_post
  );

  app.delete(
    "/api/obres/:id",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.obres_delete
  );

  app.get("/api/obres/:id", controller.obres_detall);

  app.get(
    "/api/obres/:id/moviments",
    [authJWT.verifyAccessToken],
    controller.obres_detall_moviments
  );

  app.post(
    "/api/obres/:id/moviments",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.obres_detall_moviments_post
  );
};
