const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/usuaris.controller");

module.exports = (app) => {
  app.get("/api/auth/user", [authJWT.verifyToken], controller.userInfo);

  app.get(
    "/api/usuaris/:username/first-available-num",
    [authJWT.verifyToken, authJWT.isAdmin],
    controller.usuaris_detall_firstavailablenum
  );

  app.get(
    "/api/usuaris/:id/agrupacions",
    [authJWT.verifyToken],
    controller.usuaris_detall_agrupacions
  );
};
