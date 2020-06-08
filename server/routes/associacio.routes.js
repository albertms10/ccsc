const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/associacio.controller");

module.exports = (app) => {
  app.get(
    "/api/associacio",
    [authJWT.verifyAccessToken],
    controller.associacio_get
  );

  app.get(
    "/api/associacio/avisos/:id",
    controller.associacio_avisos_detall
  );

  app.get(
    "/api/associacio/cursos",
    [authJWT.verifyAccessToken],
    controller.associacio_cursos
  )
};
