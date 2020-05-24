const controller = require("../controllers/usuaris.controller");

module.exports = (app) => {
  app.get(
    "/api/usuaris/:username/first-available-num",
    controller.usuaris_detall_firstavailablenum
  );
};
