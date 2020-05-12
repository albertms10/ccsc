const path = require("path");
const express = require("express");
const app = express();

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

const pool = require("./app/config/pool.config");
app.set("pool", pool);

// Routes
require("./app/routes/agrupacions.routes")(app);
require("./app/routes/assajos.routes")(app);
require("./app/routes/associacio.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/concerts.routes")(app);
require("./app/routes/esdeveniments.routes")(app);
require("./app/routes/establiments.routes")(app);
require("./app/routes/localitzacions.routes")(app);
require("./app/routes/projectes.routes")(app);
require("./app/routes/socis.routes")(app);
require("./app/routes/titulars.routes")(app);
require("./app/routes/usuaris.routes")(app);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST);
console.log(`Running on http://localhost:${PORT}`);
