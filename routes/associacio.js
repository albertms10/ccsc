module.exports = (app) => {
  const connection = app.get('connection');

  app.get('/api/associacio', (req, res, next) => {
    connection.query(
        `SELECT *
         FROM associacio;`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.get('/api/associacio/agrupacions', (req, res, next) => {
    connection.query(
        `SELECT id_agrupacio, a.nom, IFNULL(nom_curt, a.nom) AS nom_curt, descripcio, num_persones
         FROM associacio
                  INNER JOIN agrupacions_associacio aa USING (id_associacio)
                  INNER JOIN agrupacions a USING (id_agrupacio);`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });
};
