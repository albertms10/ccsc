const { parseAndSendJSON } = require("../helpers");
const {
  assajos_query_helper
} = require("../query-helpers/assajos.query-helper");

exports.assajos_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_assaig = req.params.id;

  pool
    .query(
      `SELECT ${assajos_query_helper}
         FROM assajos a
                  INNER JOIN esdeveniments e ON a.id_assaig = e.id_esdeveniment
         WHERE ?;`,
      { id_assaig }
    )
    .then(([assaig]) =>
      parseAndSendJSON(res, next, assaig, ["agrupacions", "projectes"])
    );
};

exports.assajos_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT COUNT(*) AS assajos_count
         FROM assajos;`
    )
    .then(([{ assajos_count }]) => res.json(assajos_count))
    .catch((e) => next(e));
};

exports.assajos_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT CONCAT('T', num, ' (', REPLACE(id_curs, '-', '–'), ')') AS x,
                (
                    SELECT COUNT(*)
                    FROM assajos
                             INNER JOIN esdeveniments e ON assajos.id_assaig = e.id_esdeveniment
                    WHERE e.dia_inici BETWEEN (SELECT t.data_inici) AND IFNULL((SELECT t.data_final), NOW())
                )                                                       AS y
         FROM trimestres t;`
    )
    .then((historial) => res.json(historial))
    .catch((e) => next(e));
};

exports.assajos_post = async (req, res, next) => {
  const pool = req.app.get("pool");
  const assaig = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e) =>
    connection.rollback().then(() => {
      console.log("Transaction rolled back");
      next(e);
    });

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query(
            `INSERT INTO esdeveniments (dia_inici, hora_inici, hora_final)
             VALUES ?;`,
          [[[assaig.dia_inici, ...assaig.hora]]]
        )
        .then(({ insertId: id_esdeveniment }) => {
          connection
            .query(
                `INSERT INTO esdeveniments_musicals (id_esdeveniment_musical)
                 VALUES (?);`,
              [id_esdeveniment]
            )
            .then(() => {
              connection
                .query(
                    `INSERT INTO assajos (id_assaig, es_general, es_extra)
                     VALUES ?;`,
                  [
                    [
                      [
                        id_esdeveniment,
                        assaig.es_general || false,
                        assaig.es_extra || false
                      ]
                    ]
                  ]
                )
                .then(async () => {
                  try {
                    if (assaig.agrupacions.length > 0)
                      await connection.query(
                          `INSERT INTO assajos_agrupacions
                           VALUES ?;`,
                        [
                          assaig.agrupacions.map((agrupacio) => [
                            id_esdeveniment,
                            agrupacio
                          ])
                        ]
                      );
                  } catch (e) {
                    transactionRollback(e);
                  } finally {
                    connection.commit();
                    res.status(204).send();
                  }
                })
                .catch(transactionRollback);
            })
            .catch(transactionRollback);
        })
        .catch(transactionRollback);
    })
    .catch(transactionRollback);
};

exports.assajos_delete = async (req, res, next) => {
  const pool = res.app.get("pool");
  const id_assaig = req.params.id;

  pool
    .query(
      "SET @id_assaig = ?;" +
      "START TRANSACTION;" +
        `DELETE
         FROM assajos_agrupacions
         WHERE id_assaig = @id_assaig;

            DELETE
            FROM assajos_projectes
            WHERE id_assaig = @id_assaig;

            DELETE
            FROM assajos
            WHERE id_assaig = @id_assaig;

            DELETE
            FROM esdeveniments_musicals
            WHERE id_esdeveniment_musical = @id_assaig;

            DELETE
            FROM esdeveniments
            WHERE id_esdeveniment = @id_assaig;

            COMMIT;`,
      [id_assaig]
    )
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.assajos_detall_convocats = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_assaig = req.params.id;

  pool
    .query(
        `SELECT p.id_persona,
                p.nom,
                p.cognoms,
                p.nom_complet,
                (
                    SELECT IFNULL(
                                   (
                                       SELECT GROUP_CONCAT(id_veu)
                                       FROM socis_veu_moviment_projectes
                                                INNER JOIN veus_moviments USING (id_veu_moviment)
                                       WHERE id_soci = (SELECT p.id_persona)
                                   ), IFNULL(
                                           (
                                               SELECT GROUP_CONCAT(id_veu)
                                               FROM socis_projectes_veu
                                               WHERE id_soci = (SELECT p.id_persona)
                                           ),
                                           (
                                               SELECT GROUP_CONCAT(id_veu)
                                               FROM socis_agrupacions_veus
                                                        INNER JOIN socis_agrupacions USING (id_soci_agrupacio)
                                                        INNER JOIN agrupacions USING (id_agrupacio)
                                               WHERE id_soci = (SELECT p.id_persona)
                                           )
                                       )
                               )
                ) AS id_veu
         FROM socis
                  INNER JOIN persones p ON socis.id_soci = p.id_persona
         HAVING id_veu IN
                (
                    SELECT DISTINCT id_veu
                    FROM assajos
                             INNER JOIN veus_convocades_assaig USING (id_assaig)
                    WHERE id_assaig = ?
                );`,
      [id_assaig]
    )
    .then((convocats) => res.json(convocats))
    .catch((e) => next(e));
};
