module.exports = (app) => {
  const connection = app.get('connection');

  app.get('/api/establiments', (req, res, next) => {
    connection.query(
        `SELECT *
         FROM establiments;`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.get('/api/establiments/:id/esdeveniments', (req, res, next) => {
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
      });
  });
};
