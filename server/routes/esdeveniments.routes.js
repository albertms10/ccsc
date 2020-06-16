const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/esdeveniments.controller");

module.exports = (app) => {
  app.get("/api/esdeveniments", controller.esdeveniments_get);

  app.get(
    "/api/esdeveniments/estats-confirmacio",
    [authJWT.verifyAccessToken],
    controller.esdeveniments_estatsconfirmacio
  );

  app.get(
    "/api/esdeveniments/:id/assistents",
    [authJWT.verifyAccessToken],
    controller.esdeveniments_detall_assistents_get
  );

  app.put(
    "/api/esdeveniments/:id/assistents",
    [authJWT.verifyAccessToken, authJWT.isJuntaDirectiva],
    controller.esdeveniments_detall_assistents_put
  );
};
