exports.establiments_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT *
       FROM establiments;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};

exports.establiments_detall_esdeveniments = (req, res, next) => {
  const pool = req.app.get("pool");
  const establiment = req.params.id;

  pool.query(
    `SELECT *
       FROM establiments
                INNER JOIN localitzacions l ON establiments.id_establiment = l.id_localitzacio
                INNER JOIN esdeveniments e ON l.id_localitzacio = e.id_localitzacio
       WHERE id_establiment = ?;`,
    [establiment],
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};
