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
        `SELECT DISTINCT a.*,
                         data_inici,
                         data_final,
                         (SELECT estat
                          FROM estats_confirmacio
                          WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)) AS estat_esdeveniment,
                         (SELECT estat
                          FROM estats_confirmacio
                          WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)) AS estat_localitzacio,
                         (SELECT JSON_ARRAYAGG(
                                         JSON_OBJECT(
                                                 'id_projecte', id_projecte,
                                                 'titol', titol,
                                                 'inicials', inicials,
                                                 'color', color
                                             )
                                     )
                          FROM projectes
                                   INNER JOIN assajos_projectes USING (id_projecte)
                          WHERE id_assaig = (SELECT a.id_assaig))                      AS projectes
         FROM esdeveniments
                  INNER JOIN assajos a ON esdeveniments.id_esdeveniment = a.id_assaig
                  INNER JOIN assajos_projectes USING (id_assaig)
                  INNER JOIN projectes_agrupacions USING (id_projecte)
         WHERE id_agrupacio = ?;`,
      [id_agrupacio],
      (err, rows) => {
        if (err) next(err);

        try {
          rows.forEach(assaig => {
            assaig.projectes = JSON.parse(assaig.projectes);
          });
        } catch (e) {
          next(e);
          res.end();
        }

        res.send(rows);
      });
  });

  app.get('/api/agrupacions/:id/concerts', (req, res, next) => {
    const id_agrupacio = req.params.id;

    connection.query(
        `SELECT id_concert,
                data_inici,
                c.titol                                                       AS titol_concert,
                p.titol                                                       AS titol_projecte,
                inicials                                                      AS inicials_projecte,
                color                                                         AS color_projecte,
                (SELECT estat
                 FROM estats_confirmacio
                 WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)) AS estat_esdeveniment,
                (SELECT estat
                 FROM estats_confirmacio
                 WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)) AS estat_localitzacio
         FROM esdeveniments
                  INNER JOIN concerts c ON esdeveniments.id_esdeveniment = c.id_concert
                  INNER JOIN projectes p USING (id_projecte)
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

        try {
          rows.forEach(projecte => {
            projecte.directors = JSON.parse(projecte.directors);
            projecte.agrupacions = JSON.parse(projecte.agrupacions);
          });
        } catch (e) {
          next(e);
          res.end();
        }

        res.send(rows);
      });
  });

  app.get('/api/agrupacions/:id/participants', (req, res, next) => {
    const id_agrupacio = req.params.id;

    connection.query(
        `SELECT id_persona,
                p.nom,
                cognoms,
                nom_complet,
                (SELECT nom FROM veus WHERE id_veu = (SELECT sa.id_veu))         AS veu,
                (SELECT abreviatura FROM veus WHERE id_veu = (SELECT sa.id_veu)) AS abreviatura_veu
         FROM socis
                  INNER JOIN persones p ON socis.id_soci = p.id_persona
                  INNER JOIN socis_agrupacions sa USING (id_soci)
                  INNER JOIN agrupacions USING (id_agrupacio)
         WHERE id_agrupacio = ?
         ORDER BY id_veu;`,
      [id_agrupacio],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      });
  });
};
