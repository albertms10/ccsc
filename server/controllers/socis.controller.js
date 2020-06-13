const { parseAndSendJSON } = require("../helpers");
const {
  assajos_query_helper
} = require("../query-helpers/assajos.query-helper");
const { saltHashPassword } = require("../utils");
const { ROLES_IS_JUNTA_DIRECTIVA } = require("../middleware/auth-jwt");

exports.socis_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
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
                ) AS count_baixes;`
    )
    .then(([counts]) => res.json(counts))
    .catch((e) => next(e));
};

exports.socis_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT CONCAT('T', num, ' (', REPLACE(id_curs, '-', '–'), ')') AS x, COUNT(*) AS y
         FROM socis
                  INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
                  CROSS JOIN cursos
                  INNER JOIN trimestres t USING (id_curs)
         WHERE hs.data_alta <= IFNULL(t.data_final, NOW())
         GROUP BY id_trimestre, t.data_inici
         ORDER BY t.data_inici;`
    )
    .then((historial) => res.json(historial))
    .catch((e) => next(e));
};

exports.socis_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;

  pool
    .query(
        `SELECT persones.*, usuaris.*, socis.*
         FROM socis
                  INNER JOIN persones ON (id_soci = id_persona)
                  LEFT JOIN usuaris USING (id_persona)
         WHERE ?;`,
      { id_soci }
    )
    .then(([soci]) => {
      if (soci) return res.json(soci);
      res.end();
    })
    .catch((e) => next(e));
};

exports.socis_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT id_persona,
                nom,
                cognoms,
                nom_complet,
                username,
                email,
                telefon,
                IF(
                        EXISTS(
                                SELECT *
                                FROM socis
                                         INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
                                WHERE id_soci = (SELECT id_persona)
                                  AND CURRENT_DATE
                                    BETWEEN data_alta
                                    AND IFNULL(DATE_SUB(data_baixa, INTERVAL 1 DAY), CURRENT_DATE)
                                ORDER BY data_alta DESC
                            ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)
                    ) AS estat_actiu,
                (
                    SELECT MAX(data_alta)
                    FROM historial_socis
                    WHERE id_historial_soci = (SELECT id_persona)
                    ORDER BY data_alta DESC
                    LIMIT 1
                )     AS data_actiu,
                (
                    SELECT MAX(data_baixa)
                    FROM historial_socis
                    WHERE id_historial_soci = (SELECT id_persona)
                    ORDER BY data_alta DESC
                    LIMIT 1
                )     AS data_inactiu,
                (
                    SELECT IFNULL(DATEDIFF(data_baixa, data_alta), DATEDIFF(NOW(), data_alta)) + 1
                    FROM historial_socis
                    WHERE id_historial_soci = (SELECT id_persona)
                    ORDER BY data_alta DESC
                    LIMIT 1
                )     AS dies_activitat,
                (
                    SELECT DATEDIFF(NOW(), data_baixa) + 1
                    FROM historial_socis
                    WHERE id_historial_soci = (SELECT id_persona)
                    ORDER BY data_alta DESC
                    LIMIT 1
                )     AS dies_inactivitat
         FROM socis
                  INNER JOIN persones ON socis.id_soci = persones.id_persona
                  LEFT JOIN usuaris USING (id_persona)
         ORDER BY estat_actiu DESC, cognoms, nom;`
    )
    .then((socis) => parseAndSendJSON(res, next, socis, ["estat_actiu"]))
    .catch((e) => next(e));
};

exports.socis_post = async (req, res, next) => {
  const pool = req.app.get("pool");
  const email = req.email;
  const soci = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e) => connection.rollback().then(() => next(e));

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query(
            `INSERT INTO persones (nom, cognoms, naixement, id_pais, dni, email, telefon)
             VALUES ?;`,
          [
            [
              [
                soci.nom,
                soci.cognoms,
                soci.naixement,
                soci.nacionalitat,
                soci.dni,
                email || soci.email,
                soci.telefon
              ]
            ]
          ]
        )
        .then(({ insertId: id_persona }) => {
          const password = soci.dni.match(/\d+/)[0];
          const { salt, hash } = saltHashPassword({ password });

          connection
            .query(
                `INSERT INTO usuaris_complet (username, id_persona, salt, encrypted_password)
                 VALUES ?;`,
              [[[soci.username, id_persona, salt, hash]]]
            )
            .then(({ insertId: id_usuari }) => {
              connection
                .query(
                    `INSERT INTO roles_usuaris
                     VALUES ?;`,
                  [[[id_usuari, 1]]]
                )
                .catch(transactionRollback);
            })
            .catch(transactionRollback);

          connection
            .query(
                `INSERT INTO socis (id_soci, experiencia_musical, estudis_musicals)
                 VALUES ?;`,
              [[[id_persona, soci.experiencia_musical, soci.estudis_musicals]]]
            )
            .then(() => {
              if (soci.acceptacions)
                connection
                  .query(
                      `INSERT INTO socis_acceptacions (id_soci, id_acceptacio_avis, accepta)
                       VALUES ?;`,
                    [
                      Object.keys(soci.acceptacions).map((acceptacio) => [
                        id_persona,
                        {
                          toSqlString: () =>
                            `(SELECT id_acceptacio_avis FROM acceptacions_avis WHERE form_name = ${connection.escape(
                              acceptacio
                            )})`
                        },
                        soci.acceptacions[acceptacio]
                      ])
                    ]
                  )
                  .catch(transactionRollback);

              connection
                .query(
                    `INSERT INTO historial_socis (id_historial_soci, data_alta)
                     VALUES ?;`,
                  [[[id_persona, soci.data_alta]]]
                )
                .then(() => {
                  connection
                    .query(
                        `DELETE
                         FROM emails_espera
                         WHERE ?;`,
                      { email }
                    )
                    .then(() => {
                      connection.commit();
                      res.status(204).send();
                    })
                    .catch(transactionRollback);
                })
                .catch(transactionRollback);
            });
        })
        .catch(transactionRollback);
    })
    .catch((e) => next(e));
};

exports.socis_delete = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_persona = req.params.id;

  pool
    .query(
      "SET @id_persona = ?;" +
      "START TRANSACTION;" +
        `DELETE ru
         FROM roles_usuaris ru
                  INNER JOIN usuaris USING (id_usuari)
         WHERE id_persona = @id_persona;

            DELETE
            FROM usuaris_complet
            WHERE id_persona = @id_persona;

            DELETE
            FROM historial_socis
            WHERE id_historial_soci = @id_persona;

            DELETE
            FROM socis_acceptacions
            WHERE id_soci = @id_persona;

            DELETE
            FROM socis_activitats
            WHERE id_soci = @id_persona;

            DELETE sav
            FROM socis_formacions_veus sav
                     INNER JOIN socis_formacions USING (id_soci_formacio)
            WHERE id_soci = @id_persona;

            DELETE
            FROM socis_formacions
            WHERE id_soci = @id_persona;

            DELETE
            FROM socis
            WHERE id_soci = @id_persona;

            DELETE
            FROM persones
            WHERE id_persona = @id_persona;
            COMMIT;`,
      [id_persona]
    )
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.socis_detall_formacions = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;

  pool
    .query(
      "SET @id_soci = ?;" +
        `SELECT DISTINCT id_formacio,
                         formacions.nom,
                         nom_curt,
                         descripcio,
                         num_persones,
                         tipus_formacions.nom AS tipus_formacio
         FROM formacions
                  INNER JOIN tipus_formacions USING (id_tipus_formacio)
                  INNER JOIN formacions_agrupacio USING (id_formacio)
                  LEFT JOIN socis_formacions USING (id_formacio)
                  LEFT JOIN socis USING (id_soci)
                  LEFT JOIN persones p ON socis.id_soci = p.id_persona
                  LEFT JOIN usuaris u USING (id_persona)
         WHERE socis.id_soci = @id_soci
            OR EXISTS(
                 SELECT *
                 FROM roles
                          INNER JOIN roles_usuaris USING (id_role)
                          INNER JOIN usuaris USING (id_usuari)
                          INNER JOIN socis ON usuaris.id_persona = socis.id_soci
                 WHERE id_soci = @id_soci
                   AND role IN (?)
             );`,
      [id_soci, ROLES_IS_JUNTA_DIRECTIVA]
    )
    .then(([_, formacions]) => res.json(formacions))
    .catch((e) => next(e));
};

exports.socis_detall_projectes = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;

  pool
    .query(
      "SET @id_soci = ?;" +
        `SELECT DISTINCT projectes.id_projecte,
                         titol,
                         descripcio,
                         inicials,
                         color,
                         data_inici,
                         data_final,
                         id_curs,
                         YEAR(cursos.inici) AS any_inici_curs,
                         YEAR(cursos.final) AS any_final_curs,
                         (
                             SELECT IFNULL(JSON_ARRAYAGG(
                                                   JSON_OBJECT(
                                                           'id_director', id_director,
                                                           'nom', nom_complet
                                                       )
                                               ), '[]')
                             FROM directors_projectes
                                      INNER JOIN persones p ON directors_projectes.id_director = p.id_persona
                             WHERE id_projecte = (SELECT projectes.id_projecte)
                         )                  AS directors,
                         (
                             SELECT IFNULL(JSON_ARRAYAGG(
                                                   JSON_OBJECT(
                                                           'id_formacio', formacions.id_formacio,
                                                           'nom', nom,
                                                           'nom_curt', nom_curt
                                                       )
                                               ), '[]')
                             FROM projectes_formacions
                                      INNER JOIN formacions USING (id_formacio)
                             WHERE id_projecte = (SELECT projectes.id_projecte)
                         )                  AS formacions
         FROM projectes
                  INNER JOIN projectes_formacions USING (id_projecte)
                  INNER JOIN socis_formacions USING (id_formacio)
                  INNER JOIN cursos USING (id_curs)
         WHERE id_soci = @id_soci
            OR EXISTS(
                 SELECT *
                 FROM roles
                          INNER JOIN roles_usuaris USING (id_role)
                          INNER JOIN usuaris USING (id_usuari)
                          INNER JOIN socis ON usuaris.id_persona = socis.id_soci
                 WHERE id_soci = @id_soci
                   AND role IN (?)
             );`,
      [id_soci, ROLES_IS_JUNTA_DIRECTIVA]
    )
    .then(([_, projectes]) =>
      parseAndSendJSON(res, next, projectes, ["directors", "formacions"])
    )
    .catch((e) => next(e));
};

exports.socis_detall_assajos = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;

  pool
    .query(
      "SET @id_soci = ?;" +
      `SELECT DISTINCT ${assajos_query_helper}
         FROM esdeveniments
                  INNER JOIN assajos a ON esdeveniments.id_esdeveniment = a.id_assaig
                  LEFT JOIN assajos_projectes USING (id_assaig)
                  LEFT JOIN assajos_formacions USING (id_assaig)
                  LEFT JOIN projectes_formacions USING (id_projecte)
                  LEFT JOIN socis_formacions sa ON assajos_formacions.id_formacio = sa.id_formacio
                  LEFT JOIN usuaris ON sa.id_soci = id_persona
         WHERE EXISTS(
                 SELECT *
                 FROM veus_convocades_assaig
                          INNER JOIN socis_formacions_veus USING (id_veu)
                          INNER JOIN socis_formacions USING (id_soci_formacio)
                 WHERE id_soci = @id_soci
                   AND id_assaig = (SELECT a.id_assaig)
             )
            OR EXISTS(
                 SELECT *
                 FROM roles
                          INNER JOIN roles_usuaris USING (id_role)
                          INNER JOIN usuaris u USING (id_usuari)
                          INNER JOIN socis ON id_soci = u.id_persona
                 WHERE id_soci = @id_soci
                   AND role IN (?)
             )
         ORDER BY dia_inici, hora_inici;`,
      [id_soci, ROLES_IS_JUNTA_DIRECTIVA]
    )
    .then(([_, assajos]) =>
      parseAndSendJSON(res, next, assajos, ["formacions", "projectes"])
    )
    .catch((e) => next(e));
};

exports.socis_detall_acceptacions_get = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;

  pool
    .query(
        `SELECT IFNULL(
                        JSON_OBJECTAGG(form_name, IF(accepta, CAST(TRUE AS JSON), CAST(FALSE AS JSON))),
                        '{}'
                    ) AS acceptacions
         FROM socis_acceptacions
                  INNER JOIN acceptacions_avis USING (id_acceptacio_avis)
         WHERE ?;`,
      { id_soci }
    )
    .then(([{ acceptacions }]) => parseAndSendJSON(res, next, acceptacions))
    .catch((e) => next(e));
};

exports.socis_detall_acceptacions_put = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;
  /** @type {Object<string, boolean>} */
  const acceptacions = req.body;

  pool
    .query(
        `INSERT INTO socis_acceptacions (id_soci, id_acceptacio_avis, accepta)
         VALUES ?
         ON DUPLICATE KEY UPDATE id_soci            = VALUES(id_soci),
                                 id_acceptacio_avis = VALUES(id_acceptacio_avis),
                                 accepta            = VALUES(accepta);`,
      [
        Object.keys(acceptacions).map((acceptacio) => [
          id_soci,
          {
            toSqlString: () =>
              `(SELECT id_acceptacio_avis FROM acceptacions_avis WHERE form_name = ${pool.escape(
                acceptacio
              )})`
          },
          acceptacions[acceptacio]
        ])
      ]
    )
    .then(() => res.json(acceptacions))
    .catch((e) => next(e));
};

exports.socis_detall_activitat = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;

  pool
    .query(
        `SELECT data_alta,
                data_baixa,
                IFNULL(DATEDIFF(data_baixa, data_alta), DATEDIFF(NOW(), data_alta)) + 1 AS dies_activitat
         FROM historial_socis
                  INNER JOIN socis s ON historial_socis.id_historial_soci = s.id_soci
         WHERE ?;`,
      { id_soci }
    )
    .then((activitat) => res.json(activitat))
    .catch((e) => next(e));
};

exports.socis_detall_alta = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;

  pool
    .query(
        `INSERT INTO historial_socis (id_historial_soci, data_alta)
         VALUES (?, CURRENT_DATE);`,
      [id_soci]
    )
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.socis_detall_baixa = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_soci = req.params.id;

  pool
    .query(
        `UPDATE historial_socis
         SET data_baixa = CURRENT_DATE
         WHERE id_historial_soci = ?
         ORDER BY data_alta DESC
         LIMIT 1;`,
      [id_soci]
    )
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
