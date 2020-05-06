exports.titulars_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT *
       FROM titulars
       ORDER BY ordre IS NULL, data_inici;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};
