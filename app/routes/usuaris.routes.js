const authJwt = require("../middleware/auth-jwt");
const controller = require("../controllers/usuaris.controller");

module.exports = (app) => {
  app.get("/api/auth/user", [authJwt.verifyToken], controller.userInfo);

  app.get(
    "/api/usuaris/:username/first-available-num",
    controller.usuaris_detall_firstavailablenum
  );

  app.get(
    "/api/usuaris/:id/agrupacions",
    controller.usuaris_detall_agrupacions
  );
};
