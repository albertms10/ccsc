const express = require("express");
const app = express();

const PORT = 5000;
const HOST = "localhost";

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const connection = require("./connection.config");
app.set("connection", connection);

// Routes
require("./routes/agrupacions.routes")(app);
require("./routes/associacions.routes")(app);
require("./routes/esdeveniments.routes")(app);
require("./routes/establiments.routes")(app);
require("./routes/titulars.routes")(app);
require("./routes/localitzacions.routes")(app);
require("./routes/socis.routes")(app);
require("./routes/usuaris.routes")(app);

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

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
