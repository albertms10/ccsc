import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as RateLimit from "express-rate-limit";
import * as path from "path";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";
import { apiPath } from "../../common/common.functions";
import pool from "./config/db.config";
import * as routes from "./routes";

const app = express();

const PORT = parseInt(process.env.PORT || "5000");
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
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  try {
    app.set("pool", pool);
    next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

app.use(apiPath("/assajos"), routes.assajos);
app.use(apiPath("/auth"), routes.auth);
app.use(apiPath("/concerts"), routes.concerts);
app.use(apiPath("/entitats"), routes.entitats);
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

const swaggerDocument = YAML.load(path.resolve(__dirname, "../docs/docs.yaml"));

app.use(
  apiPath("/docs"),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: "../docs-styles.css",
  })
);

app.get("/locales/*", (req, res) => {
  res.json({});
});

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
});

app.use(limiter);

app.get(apiPath("/docs-styles.css"), (req, res) => {
  res.sendFile(path.resolve(__dirname, "../docs", "docs.css"));
});

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../../../../client/build", "index.html")
  );
});

app.listen(PORT, HOST);
