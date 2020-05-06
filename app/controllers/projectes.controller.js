exports.projectes_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT COUNT(*) AS projectes_count
       FROM projectes;`,
    (err, rows) => {
      if (err) next(err);
      res.json(rows);
    }
  );
};

exports.projectes_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  // TODO: Com tenir en compte els projectes que s’allarguin més d‘un curs?
  pool.query(
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
