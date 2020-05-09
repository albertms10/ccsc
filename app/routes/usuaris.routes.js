const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/usuaris.controller");

module.exports = (app) => {
  app.get("/api/auth/user", [authJWT.verifyAccessToken], controller.userInfo);

  app.get(
    "/api/usuaris/:username/first-available-num",
    [authJWT.verifyAccessToken],
    controller.usuaris_detall_firstavailablenum
  );

  app.get(
    "/api/usuaris/:id/agrupacions",
    [authJWT.verifyAccessToken],
    controller.usuaris_detall_agrupacions
  );
};
