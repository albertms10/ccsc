exports.associacio_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT *
       FROM associacio;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};
