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
        `SELECT agrupacions.*
         FROM associacio
                  INNER JOIN agrupacions_associacio USING (id_associacio)
                  INNER JOIN agrupacions USING (id_agrupacio);`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });
};
