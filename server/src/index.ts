import * as bodyParser from "body-parser";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import RateLimit from "express-rate-limit";
import * as path from "path";
import { Pool } from "promise-mysql";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";
import { apiPath } from "../../common/common.functions";
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

app.use(apiPath("/agrupacions"), routes.agrupacions);
app.use(apiPath("/assajos"), routes.assajos);
app.use(apiPath("/auth"), routes.auth);
app.use(apiPath("/concerts"), routes.concerts);
app.use(apiPath("/esdeveniments"), routes.esdeveniments);
app.use(apiPath("/formacions"), routes.formacions);
app.use(apiPath("/establiments"), routes.establiments);
app.use(apiPath("/localitzacions"), routes.localitzacions);
app.use(apiPath("/moviments"), routes.moviments);
app.use(apiPath("/obres"), routes.obres);
app.use(apiPath("/projectes"), routes.projectes);
app.use(apiPath("/socis"), routes.socis);
app.use(apiPath("/titulars"), routes.titulars);
app.use(apiPath("/usuaris"), routes.usuaris);

const swaggerDocument = YAML.load("./docs/docs.yaml");

app.use(
  apiPath("/docs"),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: "../docs-styles.css",
  })
);

app.get("/locales/*", (req: Request, res: Response) => {
  res.json({});
});

const limiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
});

app.use(limiter);

app.get(apiPath("/docs-styles.css"), (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../docs", "docs.css"));
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(
    path.resolve(__dirname, "../../../../client/build", "index.html")
  );
});

app.listen(PORT, HOST);
