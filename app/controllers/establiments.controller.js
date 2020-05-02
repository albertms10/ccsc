exports.establiments_get = (req, res, next) => {
  const connection = req.app.get("connection");

  connection.query(
    `SELECT *
       FROM establiments;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};

exports.establiments_detall_esdeveniments = (req, res, next) => {
  const connection = req.app.get("connection");
  const establiment = req.params.id;

  connection.query(
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
