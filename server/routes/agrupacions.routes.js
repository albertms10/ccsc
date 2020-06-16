const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/agrupacions.controller");

module.exports = (app) => {
  app.get(
    "/api/agrupacio",
    [authJWT.verifyAccessToken],
    controller.agrupacions_get
  );

  app.get(
    "/api/agrupacio/avisos/:id",
    controller.agrupacions_avisos_detall
  );

  app.get(
    "/api/agrupacio/cursos",
    [authJWT.verifyAccessToken],
    controller.agrupacions_cursos
  )
};
