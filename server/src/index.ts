import * as bodyParser from "body-parser";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as path from "path";
import { Pool } from "promise-mysql";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";
import poolPromise from "./config/db.config";
import * as routes from "./routes";

const app = express();

const PORT = parseInt(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err: Error) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use((req: Request, res: Response, next: NextFunction) => {
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
    pool = await poolPromise;
    app.set("pool", pool);
    next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

const BASE_PATH = "/api";

app.use(`${BASE_PATH}/agrupacions`, routes.agrupacions);
app.use(`${BASE_PATH}/assajos`, routes.assajos);
app.use(`${BASE_PATH}/auth`, routes.auth);
app.use(`${BASE_PATH}/concerts`, routes.concerts);
app.use(`${BASE_PATH}/esdeveniments`, routes.esdeveniments);
app.use(`${BASE_PATH}/formacions`, routes.formacions);
app.use(`${BASE_PATH}/establiments`, routes.establiments);
app.use(`${BASE_PATH}/localitzacions`, routes.localitzacions);
app.use(`${BASE_PATH}/moviments`, routes.moviments);
app.use(`${BASE_PATH}/obres`, routes.obres);
app.use(`${BASE_PATH}/projectes`, routes.projectes);
app.use(`${BASE_PATH}/socis`, routes.socis);
app.use(`${BASE_PATH}/titulars`, routes.titulars);
app.use(`${BASE_PATH}/usuaris`, routes.usuaris);

const swaggerDocument = YAML.load("./docs/docs.yaml");

app.use(
  `${BASE_PATH}/docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: "../docs-styles.css",
  })
);

app.get(`${BASE_PATH}/docs-styles.css`, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../docs", "docs.css"));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, HOST);
