exports.assajos_count = (req, res, next) => {
  const connection = req.app.get("connection");

  connection.query(
    `SELECT COUNT(*) AS assajos_count
       FROM assajos;`,
    (err, rows) => {
      if (err) next(err);
      res.json(rows);
    }
  );
};

exports.assajos_historial = (req, res, next) => {
  const connection = req.app.get("connection");

  connection.query(
    `SELECT CONCAT('T', num, ' (', REPLACE(id_curs, '-', '–'), ')') AS x,
              (
                  SELECT COUNT(*)
                  FROM assajos
                           INNER JOIN esdeveniments e ON assajos.id_assaig = e.id_esdeveniment
                  WHERE e.dia_inici BETWEEN (SELECT t.data_inici) AND IFNULL((SELECT t.data_final), NOW())
              )                                                       AS y
       FROM trimestres t;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};
