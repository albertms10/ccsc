const authJWT = require("../middleware/auth-jwt");
const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/email-espera", controller.email_espera);

  app.get("/api/auth/user", [authJWT.verifyAccessToken], controller.userInfo);
};
