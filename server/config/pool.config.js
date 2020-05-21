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
    charset: "utf8mb4",
    timezone: "Z",
  });

/*
const ensureSchema = async (pool) => {
  // Wait for tables to be created (if they don't already exist).
  await pool.query(
    `CREATE TABLE IF NOT EXISTS votes
      ( vote_id SERIAL NOT NULL, time_cast timestamp NOT NULL,
      candidate CHAR(6) NOT NULL, PRIMARY KEY (vote_id) );`
  );

  console.log(`Ensured that tables exist`);
};
*/

const poolPromise = createPool()
  .then(async (pool) => {
    // await ensureSchema(pool);
    return pool;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = poolPromise;
