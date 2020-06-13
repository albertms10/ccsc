const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/agrupacio.controller");

module.exports = (app) => {
  app.get(
    "/api/agrupacio",
    [authJWT.verifyAccessToken],
    controller.agrupacio_get
  );

  app.get(
    "/api/agrupacio/avisos/:id",
    controller.agrupacio_avisos_detall
  );

  app.get(
    "/api/agrupacio/cursos",
    [authJWT.verifyAccessToken],
    controller.agrupacio_cursos
  )
};
