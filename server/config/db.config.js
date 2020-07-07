const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config();

const createPool = async () =>
  await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_LIMIT,
    multipleStatements: true,
    // charset: "utf8mb4",
    timezone: "Z",
    typeCast: (field, next) =>
      [
        "amb_retard",
        "convocada",
        "es_actiu",
        "es_anonim",
        "es_assaig_ordinari",
        "es_dona",
        "es_institucio",
        "es_parcial",
        "requerida",
        "requerit",
      ].includes(field.name)
        ? field.string() === "1"
        : next(),
  });

const ensureSchema = async (pool) => {
  // await pool.query(
  //   fs.readFileSync(
  //     path.join(__dirname, "../../database/db-generator.sql"),
  //     "utf8"
  //   )
  // );
  // console.log("Ensured that all tables exist");
};

const poolPromise = createPool()
  .then(async (pool) => {
    if (process.env.NODE_ENV === "production") await ensureSchema(pool);
    return pool;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = poolPromise;
