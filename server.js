const express = require("express");
const app = express();

const PORT = 5000;
const HOST = "localhost";

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const connection = require("./connection.config");
app.set("connection", connection);

// Routes
require("./app/routes/agrupacions.routes")(app);
require("./app/routes/associacions.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/esdeveniments.routes")(app);
require("./app/routes/establiments.routes")(app);
require("./app/routes/localitzacions.routes")(app);
require("./app/routes/socis.routes")(app);
require("./app/routes/titulars.routes")(app);
require("./app/routes/usuaris.routes")(app);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
