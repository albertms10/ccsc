import * as dotenv from "dotenv";
import * as mysql from "mysql2/promise";

dotenv.config();

export default mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: parseInt(process.env.DB_LIMIT || "10"),
  multipleStatements: true,
  timezone: "Z",
  dateStrings: true,
  typeCast: (field, next) =>
    [
      "amb_retard",
      "convocada",
      "disponible",
      "dins_periode",
      "email_exists",
      "es_actiu",
      "es_anonim",
      "es_assaig_ordinari",
      "es_dona",
      "es_extra",
      "es_general",
      "es_institucio",
      "es_parcial",
      "es_role",
      "es_unic_moviment",
      "requerida",
      "requerit",
      "treballat",
    ].includes(field.name)
      ? field.string() === "1"
      : next(),
});
