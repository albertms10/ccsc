const controller = require("../controllers/agrupacions.controller");

module.exports = (app) => {
  app.get("/api/agrupacions", controller.agrupacions_get);

  app.get("/api/agrupacions/:id", controller.agrupacions_detall);

  app.get(
    "/api/agrupacions/:id/esdeveniments",
    controller.agrupacions_detall_esdeveniments
  );

  app.get(
    "/api/agrupacions/:id/assajos",
    controller.agrupacions_detall_assajos
  );

  app.get(
    "/api/agrupacions/:id/concerts",
    controller.agrupacions_detall_concerts
  );

  app.get(
    "/api/agrupacions/:id/projectes",
    controller.agrupacions_detall_projectes
  );

  app.get(
    "/api/agrupacions/:id/participants",
    controller.agrupacions_detall_participants
  );
};
