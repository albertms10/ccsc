const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/agrupacions.controller");

module.exports = (app) => {
  app.get(
    "/api/agrupacions/:id",
    [authJWT.verifyToken],
    controller.agrupacions_detall
  );

  app.get(
    "/api/agrupacions/:id/esdeveniments",
    [authJWT.verifyToken],
    controller.agrupacions_detall_esdeveniments
  );

  app.get(
    "/api/agrupacions/:id/assajos",
    [authJWT.verifyToken],
    controller.agrupacions_detall_assajos
  );

  app.get(
    "/api/agrupacions/:id/concerts",
    [authJWT.verifyToken],
    controller.agrupacions_detall_concerts
  );

  app.get(
    "/api/agrupacions/:id/projectes",
    [authJWT.verifyToken],
    controller.agrupacions_detall_projectes
  );

  app.get(
    "/api/agrupacions/:id/integrants",
    [authJWT.verifyToken],
    controller.agrupacions_detall_integrants
  );
};
