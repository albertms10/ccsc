module.exports = (app) => {
  const connection = app.get('connection');

  app.get('/api/esdeveniments', (req, res, next) => {
    connection.query(
        `SELECT id_esdeveniment,
                data_inici,
                data_final,
                id_estat_esdeveniment,
                (SELECT estat
                 FROM estats_confirmacio
                 WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)) AS estat_esdeveniment,
                id_localitzacio,
                id_estat_localitzacio,
                (SELECT estat
                 FROM estats_confirmacio
                 WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)) AS estat_localitzacio,
                id_esdeveniment_ajornat,
                IF(id_assaig, 'assaig',
                   IF(id_concert, 'concert',
                      IF(id_assemblea, 'assemblea',
                         IF(id_reunio, 'reunió', NULL)
                          )
                       )
                    )                                                         AS tipus,
                es_extra
         FROM esdeveniments
                  LEFT JOIN assajos a ON esdeveniments.id_esdeveniment = a.id_assaig
                  LEFT JOIN concerts c ON esdeveniments.id_esdeveniment = c.id_concert
                  LEFT JOIN reunions r ON esdeveniments.id_esdeveniment = r.id_reunio
                  LEFT JOIN assemblees a2 ON r.id_reunio = a2.id_assemblea;`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.post('/api/esdeveniments', (req, res, next) => {
    const { data_inici, data_final, estat_esdeveniment } = req.body.esdeveniment;

    connection.query(
        `INSERT INTO esdeveniments (data_inici, data_final, id_estat_esdeveniment)
         VALUES (?, ?, ?);`,
      [data_inici, data_final, estat_esdeveniment || 'DEFAULT'],
      (err, rows) => {
        if (err) next(err);
        res.end(rows);
      });
  });

  app.get('/api/esdeveniments/:id/assistents', (req, res, next) => {
    const esdeveniment = req.params.id;

    connection.query(
        `SELECT *
         FROM assistents_esdeveniment
                  INNER JOIN persones ON (id_soci = id_persona)
         WHERE id_soci = ?;`,
      [esdeveniment],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });
};
