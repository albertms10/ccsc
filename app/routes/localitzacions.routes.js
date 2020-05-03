const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/localitzacions.controller");

module.exports = (app) => {
  app.post(
    "/api/localitzacions",
    [authJWT.verifyToken, authJWT.isJuntaDirectiva],
    controller.localitzacions_post
  );

  app.get(
    "/api/localitzacions/tipus-vies",
    controller.localitzacions_tipusvies_get
  );

  app.get(
    "/api/localitzacions/localitzacio/:id",
    controller.localitzacions_localitzacio_detall
  );

  app.get("/api/localitzacions/ciutats", controller.localitzacions_ciutats_get);

  app.get(
    "/api/localitzacions/provincies",
    controller.localitzacions_provincies_get
  );

  app.get("/api/localitzacions/paisos", controller.localitzacions_paisos_get);
};
