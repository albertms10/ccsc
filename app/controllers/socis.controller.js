const { saltHashPassword } = require("../utils");

exports.socis_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
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
    (err, [socis_count]) => {
      if (err) next(err);
      res.json(socis_count);
    }
  );
};

exports.socis_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT CONCAT('T', num, ' (', REPLACE(id_curs, '-', '–'), ')') AS x, COUNT(*) AS y
       FROM socis
                INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
                INNER JOIN associacio USING (id_associacio)
                INNER JOIN cursos USING (id_associacio)
                INNER JOIN trimestres t USING (id_curs)
       WHERE hs.data_alta <= IFNULL(t.data_final, NOW())
       GROUP BY id_trimestre, t.data_inici
       ORDER BY t.data_inici;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};

exports.socis_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;

  pool.query(
    `SELECT persones.*, usuaris.*, socis.*
       FROM socis
                INNER JOIN persones ON (id_soci = id_persona)
                LEFT JOIN usuaris USING (id_persona)
       WHERE id_soci = ?;`,
    [id_soci],
    (err, [user]) => {
      if (err) next(err);
      if (user) {
        user.accepta_proteccio_dades = !!user.accepta_proteccio_dades;
        user.accepta_drets_imatge = !!user.accepta_drets_imatge;
        res.send(user);
      }
      res.end();
    }
  );
};

exports.socis_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
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
       ORDER BY estat_actiu DESC, cognoms, nom;`,
    (err, rows) => {
      if (err) next(err);
      res.json(rows);
    }
  );
};

exports.socis_post = (req, res, next) => {
  const pool = req.app.get("pool");
  const email = req.email;
  const soci = req.body;

  // TODO: Refaccionar amb pool.getConnection() com a transacció
  pool.query(
    `INSERT INTO persones (nom, cognoms, naixement, id_pais, dni, email, telefon,
                             accepta_proteccio_dades, accepta_drets_imatge)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      soci.nom,
      soci.cognoms,
      soci.naixement,
      soci.nacionalitat,
      soci.dni,
      email || soci.email,
      soci.telefon,
      soci.accepta_proteccio_dades,
      soci.accepta_drets_imatge,
    ],
    (err, rows_persona) => {
      if (err) next(err);
      console.log("1 record inserted into `persones`");

      const id_persona = rows_persona.insertId;

      // TODO: Comprovar que la contrasenya s’apliqui correctament
      const password = soci.naixement.split("-").reverse().join("-");
      const { salt, hash } = saltHashPassword({ password });

      // TODO Hauria de realitzar aquesta consulta p. ex. com a POST /api/usuaris?
      pool.query(
        `INSERT INTO usuaris_complet (username, id_persona, salt, encrypted_password)
           VALUES (?, ?, ?, ?);`,
        [soci.username, id_persona, salt, hash],
        (err, rows_usuari) => {
          if (err) next(err);
          console.log("1 record inserted into `usuaris_complet`");

          const id_usuari = rows_usuari.insertId;

          pool.query(
            `INSERT INTO roles_usuaris
               VALUES (?, ?);`,
            [id_usuari, 1],
            (err) => {
              if (err) next(err);
              console.log("1 record inserted into `perfils_usuaris`");
            }
          );
        }
      );

      pool.query(
        `INSERT INTO socis (id_soci, experiencia_musical, estudis_musicals)
           VALUES (?, ?, ?);`,
        [id_persona, soci.experiencia_musical, soci.estudis_musicals],
        (err) => {
          if (err) next(err);
          console.log("1 record inserted into `socis`");

          pool.query(
            `INSERT INTO historial_socis (id_historial_soci, data_alta)
               VALUES (?, ?);`,
            [id_persona, soci.data_alta],
            (err) => {
              if (err) next(err);
              console.log("1 record inserted into `historial_socis`");

              pool.query(
                `DELETE
                   FROM emails_espera
                   WHERE ?;`,
                { email },
                (err) => {
                  if (err) next(err);
                }
              );
            }
          );
        }
      );
    }
  );

  res.end();
};

exports.socis_delete = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_persona = req.params.id;

  pool.query(
    `DELETE ru
       FROM roles_usuaris ru
                INNER JOIN usuaris USING (id_usuari)
       WHERE id_persona = ?;

          DELETE
          FROM usuaris_complet
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
    // TODO: Múltiples paràmetres a la consulta -> una sola variable
    [id_persona, id_persona, id_persona, id_persona, id_persona],
    (err) => {
      if (err) next(err);
    }
  );

  res.end();
};

exports.socis_detall_acceptaprotecciodades_put = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;
  const accepta_proteccio_dades = req.body.accepta_proteccio_dades;

  pool.query(
    `UPDATE persones
       SET accepta_proteccio_dades = ?
       WHERE id_persona = ?;`,
    [accepta_proteccio_dades, id_soci],
    (err) => {
      if (err) next(err);
      res.send({ accepta_proteccio_dades });
    }
  );
};

exports.socis_detall_acceptadretsimatge_put = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;
  const accepta_drets_imatge = req.body.accepta_drets_imatge;

  pool.query(
    `UPDATE persones
       SET accepta_drets_imatge = ?
       WHERE id_persona = ?;`,
    [accepta_drets_imatge, id_soci],
    (err) => {
      if (err) next(err);
      res.send({ accepta_drets_imatge });
    }
  );
};
