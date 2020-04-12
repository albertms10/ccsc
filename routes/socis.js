const saltHashPassword = require('../utils/saltHashPassword');

module.exports = (app) => {
  const connection = app.get('connection');

  app.get('/api/socis/count', (req, res, next) => {
    connection.query(
        `SELECT (
                    SELECT COUNT(id_soci)
                    FROM socis
                             INNER JOIN persones ON socis.id_soci = persones.id_persona
                             INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
                    WHERE CURRENT_DATE BETWEEN data_alta AND IFNULL(data_baixa, CURRENT_DATE)
                ) AS count_actuals,
                (
                    SELECT COUNT(id_soci)
                    FROM socis
                             INNER JOIN persones ON socis.id_soci = persones.id_persona
                             INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
                    WHERE data_alta BETWEEN (CURRENT_DATE - INTERVAL 3 MONTH) AND CURRENT_DATE
                ) AS count_altes,
                (
                    SELECT COUNT(id_soci)
                    FROM socis
                             INNER JOIN persones ON socis.id_soci = persones.id_persona
                             INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
                    WHERE data_baixa BETWEEN (CURRENT_DATE - INTERVAL 3 MONTH) AND CURRENT_DATE
                ) AS count_baixes;`,
      (err, rows) => {
        if (err) next(err);
        res.json(rows);
      });
  });

  // TODO
  /*
  app.get('/api/socis/:username', (req, res, next) => {
    const username = req.params.username;

    connection.query(
        `SELECT *
         FROM socis
                  INNER JOIN persones ON (id_soci = id_persona)`,
      [],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      },
    );
  });
   */

  app.get('/api/socis', (req, res, next) => {
    connection.query(
        `SELECT id_persona,
                nom,
                cognoms,
                nom_complet,
                username,
                email,
                telefon,
                IF((
                       SELECT id_soci
                       FROM socis
                                INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
                       WHERE id_soci = (SELECT id_persona)
                         AND CURRENT_DATE BETWEEN data_alta AND IFNULL(data_baixa, CURRENT_DATE)
                   ) IS NULL, FALSE, TRUE) AS estat_actiu,
                (
                    SELECT MAX(data_alta)
                    FROM historial_socis
                    WHERE id_historial_soci = (SELECT id_persona)
                )                          AS data_actiu,
                (
                    SELECT MAX(data_baixa)
                    FROM historial_socis
                    WHERE id_historial_soci = (SELECT id_persona)
                )                          AS data_inactiu,
                (
                    SELECT IFNULL(DATEDIFF(data_baixa, data_alta), DATEDIFF(NOW(), data_alta)) + 1
                    FROM historial_socis
                    WHERE id_historial_soci = (SELECT id_persona)
                    ORDER BY data_alta DESC
                    LIMIT 1
                )                          AS dies_activitat,
                (
                    SELECT DATEDIFF(NOW(), data_baixa) + 1
                    FROM historial_socis
                    WHERE id_historial_soci = (SELECT id_persona)
                    ORDER BY data_alta DESC
                    LIMIT 1
                )                          AS dies_inactivitat
         FROM socis
                  INNER JOIN persones ON socis.id_soci = persones.id_persona
                  LEFT JOIN usuaris USING (id_persona)
         ORDER BY cognoms, nom;`,
      (err, rows) => {
        if (err) next(err);
        res.json(rows);
      });
  });

  app.post('/api/socis', (req, res, next) => {
    const usuari = req.body;
    const password = usuari.naixement.split('-').reverse().join('-');

    connection.query(
        `INSERT INTO persones (nom, cognoms, naixement, id_pais, dni, email,
                               accepta_proteccio_dades, accepta_drets_imatge)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [usuari.nom, usuari.cognoms, usuari.naixement, usuari.nacionalitat, usuari.dni, usuari.email, usuari.acceptaProteccioDades, usuari.acceptaDretsImatge],
      (err, rows_persones) => {
        if (err) next(err);
        console.log('1 record inserted into `persones`');

        const id_persona = rows_persones.insertId;

        connection.query(
            `INSERT INTO usuaris (username, id_persona, salt, encrypted_password)
             VALUES (?, ?, ?, ?);`,
          [usuari.username, id_persona, ...saltHashPassword({ password })],
          (err) => {
            if (err) next(err);
            console.log('1 record inserted into `usuaris`');
          });

        connection.query(
            `INSERT INTO socis (id_soci, experiencia_musical, estudis_musicals)
             VALUES (?, ?, ?);`,
          [id_persona, usuari.experiencia_musical, usuari.estudis_musicals],
          (err) => {
            if (err) next(err);
            console.log('1 record inserted into `socis`');

            connection.query(
                `INSERT INTO historial_socis (id_historial_soci, data_alta)
                 VALUES (?, ?);`,
              [id_persona, usuari.data_alta || 'CURRENT_DATE'],
              (err) => {
                if (err) next(err);
                console.log('1 record inserted into `historial_socis`');
              },
            );
          },
        );
      });

    res.end();
  });

  app.delete('/api/socis/:id', (req, res, next) => {
    const id_persona = req.params.id;

    connection.query(
        `DELETE
         FROM usuaris
         WHERE id_persona = ?;
            DELETE
            FROM historial_socis
            WHERE id_historial_soci = ?;
            DELETE
            FROM socis
            WHERE id_soci = ?;
            DELETE
            FROM persones
            WHERE id_persona = ?;`,
      [id_persona, id_persona, id_persona],
      (err) => {
        if (err) next(err);
      });

    res.end();
  });
};
