module.exports = (app) => {
  const connection = app.get('connection');

  app.post('/api/localitzacions', (req, res, next) => {
    const { tipus_via, carrer, numero, fins_numero, codi_postal, gmaps, ciutat } = req.body.localitzacio;

    connection.query(
        `INSERT INTO localitzacions (id_tipus_via, carrer, numero, fins_numero, codi_postal, gmaps, id_ciutat)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [tipus_via, carrer, numero, fins_numero, codi_postal, gmaps, ciutat],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.get('/api/localitzacions/tipus-vies', (req, res, next) => {
    connection.query(
        `SELECT *
         FROM tipus_vies;`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.get('/api/localitzacions/ciutats', (req, res, next) => {
    connection.query(
        `SELECT *
         FROM ciutats;`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.get('/api/localitzacions/provincies', (req, res, next) => {
    connection.query(
        `SELECT *
         FROM provincies;`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.get('/api/localitzacions/paisos', (req, res, next) => {
    connection.query(
        `SELECT *
         FROM paisos;`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });
};
