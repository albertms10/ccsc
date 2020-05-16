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

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

const pool = require("./config/pool.config");
app.set("pool", pool);

// Routes
require("./routes/agrupacions.routes")(app);
require("./routes/assajos.routes")(app);
require("./routes/associacio.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/concerts.routes")(app);
require("./routes/esdeveniments.routes")(app);
require("./routes/establiments.routes")(app);
require("./routes/localitzacions.routes")(app);
require("./routes/projectes.routes")(app);
require("./routes/socis.routes")(app);
require("./routes/titulars.routes")(app);
require("./routes/usuaris.routes")(app);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST);
console.log(`Running on http://localhost:${PORT}`);