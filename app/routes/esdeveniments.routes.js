const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/esdeveniments.controller");

module.exports = (app) => {
  app.get("/api/esdeveniments", controller.esdeveniments_get);

  app.post(
    "/api/esdeveniments",
    [authJWT.verifyToken, authJWT.isJuntaDirectiva],
    controller.esdeveniments_post
  );

  app.get(
    "/api/esdeveniments/:id/assistents",
    controller.esdeveniments_detall_assistents
  );
};
