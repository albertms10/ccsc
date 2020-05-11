const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.JAWSDB_HOST,
  user: process.env.JAWSDB_USER,
  password: process.env.JAWSDB_PASS,
  database: process.env.JAWSDB_NAME,
  connectionLimit: process.env.JAWSDB_LIMIT,
  multipleStatements: true,
});

module.exports = pool;
