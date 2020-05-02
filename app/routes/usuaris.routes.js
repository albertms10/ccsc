const { authJwt } = require("../middleware");
const controller = require("../controllers/usuaris.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

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
