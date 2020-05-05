exports.projectes_count = (req, res, next) => {
  const connection = req.app.get("connection");

  connection.query(
    `SELECT COUNT(*) AS projectes_count
       FROM projectes;`,
    (err, rows) => {
      if (err) next(err);
      res.json(rows);
    }
  );
};

exports.projectes_historial = (req, res, next) => {
  const connection = req.app.get("connection");

  // TODO: Com tenir en compte els projectes que s’allarguin més d‘un curs?
  connection.query(
    `SELECT REPLACE(id_curs, '-', '–') AS x, COUNT(*) AS y
       FROM projectes
                INNER JOIN cursos USING (id_curs)
       GROUP BY id_curs, cursos.inici
       ORDER BY cursos.inici;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};
