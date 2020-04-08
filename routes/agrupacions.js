module.exports = (app) => {
  const connection = app.get('connection');

  app.get('/api/agrupacions', (req, res, next) => {
    connection.query(
        `SELECT id_agrupacio, nom, IFNULL(nom_curt, nom) AS nom_curt, descripcio, num_persones
         FROM agrupacions;`,
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.get('/api/agrupacions/:id', (req, res, next) => {
    const id_agrupacio = req.params.id;

    connection.query(
        `SELECT id_agrupacio, nom, IFNULL(nom_curt, nom) AS nom_curt, descripcio, num_persones
         FROM agrupacions
         WHERE id_agrupacio = ?;`,
      [id_agrupacio],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.get('/api/agrupacions/:id/assajos', (req, res, next) => {
    const id_agrupacio = req.params.id;

    connection.query(
        `SELECT *,
                (SELECT estat
                 FROM estats_confirmacio
                 WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)) AS estat_esdeveniment,
                (SELECT estat
                 FROM estats_confirmacio
                 WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)) AS estat_localitzacio
         FROM esdeveniments
                  INNER JOIN assajos a ON esdeveniments.id_esdeveniment = a.id_assaig
                  INNER JOIN assajos_projectes USING (id_assaig)
                  INNER JOIN projectes_agrupacions USING (id_projecte)
         WHERE id_agrupacio = ?;`,
      [id_agrupacio],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.get('/api/agrupacions/:id/concerts', (req, res, next) => {
    const id_agrupacio = req.params.id;

    connection.query(
        `SELECT *,
                (SELECT estat
                 FROM estats_confirmacio
                 WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)) AS estat_esdeveniment,
                (SELECT estat
                 FROM estats_confirmacio
                 WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)) AS estat_localitzacio
         FROM esdeveniments
                  INNER JOIN concerts c ON esdeveniments.id_esdeveniment = c.id_concert
                  INNER JOIN projectes_agrupacions USING (id_projecte)
         WHERE id_agrupacio = ?;`,
      [id_agrupacio],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });

  app.get('/api/agrupacions/:id/projectes', (req, res, next) => {
    const id_agrupacio = req.params.id;

    connection.query(
        `SELECT projectes.id_projecte,
                titol,
                descripcio,
                inicials,
                color,
                id_curs,
                (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id_director, 'nom', nom_complet))
                 FROM directors_projectes
                          INNER JOIN persones p ON directors_projectes.id_director = p.id_persona
                 WHERE id_projecte = (SELECT projectes.id_projecte)) AS directors,
                (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', agrupacions.id_agrupacio, 'nom', nom))
                 FROM projectes_agrupacions
                          INNER JOIN agrupacions USING (id_agrupacio)
                 WHERE id_projecte = (SELECT projectes.id_projecte)
                   AND agrupacions.id_agrupacio <> ?)                AS agrupacions
         FROM projectes
                  INNER JOIN projectes_agrupacions USING (id_projecte)
         WHERE id_agrupacio = ?;`,
      [id_agrupacio, id_agrupacio],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });
};
