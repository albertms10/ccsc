const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/formacions.controller");

module.exports = (app) => {
  app.get(
    "/api/formacions/:id",
    [authJWT.verifyAccessToken],
    controller.formacions_detall
  );

  app.get(
    "/api/formacions/:id/esdeveniments",
    [authJWT.verifyAccessToken],
    controller.formacions_detall_esdeveniments
  );

  app.get(
    "/api/formacions/:id/concerts",
    [authJWT.verifyAccessToken],
    controller.formacions_detall_concerts
  );

  app.get(
    "/api/formacions/:id/projectes",
    [authJWT.verifyAccessToken],
    controller.formacions_detall_projectes
  );

  app.get(
    "/api/formacions/:id/integrants",
    [authJWT.verifyAccessToken],
    controller.formacions_detall_integrants
  );
};
