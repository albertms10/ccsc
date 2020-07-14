import * as bodyParser from "body-parser";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as path from "path";
import { Pool } from "promise-mysql";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";
import * as poolPromise from "./config/db.config";
import agrupacions from "./routes/agrupacions.routes";
import assajos from "./routes/assajos.routes";
import auth from "./routes/auth.routes";
import concerts from "./routes/concerts.routes";
import esdeveniments from "./routes/esdeveniments.routes";
import establiments from "./routes/establiments.routes";
import formacions from "./routes/formacions.routes";
import localitzacions from "./routes/localitzacions.routes";
import moviments from "./routes/moviments.routes";
import obres from "./routes/obres.routes";
import projectes from "./routes/projectes.routes";
import socis from "./routes/socis.routes";
import titulars from "./routes/titulars.routes";
import usuaris from "./routes/usuaris.routes";

const app = express();

const PORT = parseInt(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Content-Type, Accept"
  );
  next();
});

let pool: Pool;

app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (pool) return next();

  try {
    pool = await poolPromise.default;
    app.set("pool", pool);
    next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

app.use("/api/agrupacions", agrupacions);
app.use("/api/assajos", assajos);
app.use("/api/auth", auth);
app.use("/api/concerts", concerts);
app.use("/api/esdeveniments", esdeveniments);
app.use("/api/formacions", formacions);
app.use("/api/establiments", establiments);
app.use("/api/localitzacions", localitzacions);
app.use("/api/moviments", moviments);
app.use("/api/obres", obres);
app.use("/api/projectes", projectes);
app.use("/api/socis", socis);
app.use("/api/titulars", titulars);
app.use("/api/usuaris", usuaris);

const swaggerDocument = YAML.load("./docs/docs.yaml");

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: "../docs-styles.css",
  })
);

app.get("/api/docs-styles.css", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../docs", "docs.css"));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, HOST);
