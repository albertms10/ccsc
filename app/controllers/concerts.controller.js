exports.concerts_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT COUNT(*) AS concerts_count
       FROM concerts;`,
    (err, rows) => {
      if (err) next(err);
      res.json(rows);
    }
  );
};

exports.concerts_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT CONCAT(YEAR(dia_inici)) AS x, COUNT(*) AS y
       FROM concerts
                INNER JOIN esdeveniments e ON concerts.id_concert = e.id_esdeveniment
       GROUP BY x, YEAR(dia_inici)
       ORDER BY YEAR(dia_inici);`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};
