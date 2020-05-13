exports.concerts_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT COUNT(*) AS concerts_count
       FROM concerts;`,
    (err, [{ concerts_count }]) => {
      if (err) next(err);
      res.json(concerts_count);
    }
  );
};

exports.concerts_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT REPLACE(id_curs, '-', '–') AS x,
              (
                  SELECT COUNT(*)
                  FROM concerts
                           INNER JOIN esdeveniments e ON concerts.id_concert = e.id_esdeveniment
                  WHERE e.dia_inici BETWEEN (SELECT c.inici) AND IFNULL((SELECT c.final), NOW())
              )                          AS y
       FROM cursos c;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};
