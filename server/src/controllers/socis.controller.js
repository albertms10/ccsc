const { parseAndSendJSON, queryFile } = require("../helpers");
const { saltHashPassword } = require("../utils");
const { ROLES_IS_JUNTA_DIRECTIVA } = require("../middleware/auth-jwt");

exports.socis_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("socis/select__count_socis"))
    .then(([counts]) => res.json(counts))
    .catch((e) => next(e));
};

exports.socis_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("socis/select__historial_socis"))
    .then((historial) => res.json(historial))
    .catch((e) => next(e));
};

exports.socis_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("socis/select__soci"), [id])
    .then(([soci]) => parseAndSendJSON(res, next, soci, ["roles"]))
    .catch((e) => next(e));
};

exports.socis_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("socis/select__socis"))
    .then((socis) => res.json(socis))
    .catch((e) => next(e));
};

exports.socis_post = async (req, res, next) => {
  const pool = req.app.get("pool");
  const { email } = req;
  const { soci } = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e) => connection.rollback().then(() => next(e));

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query(queryFile("socis/insert__persones"), [
          [
            [
              soci.nom,
              soci.cognoms,
              soci.naixement,
              soci.nacionalitat,
              soci.dni,
              email || soci.email,
              soci.telefon,
            ],
          ],
        ])
        .then(({ insertId: id_persona }) => {
          const password = soci.dni.match(/\d+/)[0];
          const { salt, hash } = saltHashPassword({ password });

          connection
            .query(queryFile("socis/insert__usuaris"), [
              [[soci.username, id_persona, salt, hash]],
            ])
            .then(({ insertId: id_usuari }) => {
              connection
                .query(queryFile("socis/insert__roles_usuari"), [
                  [[id_usuari, 1]],
                ])
                .catch(transactionRollback);
            })
            .catch(transactionRollback);

          connection
            .query(queryFile("socis/insert__socis"), [
              [[id_persona, soci.experiencia_musical, soci.estudis_musicals]],
            ])
            .then(() => {
              if (soci.acceptacions)
                connection
                  .query(queryFile("socis/insert__acceptacions_soci"), [
                    Object.keys(soci.acceptacions).map((acceptacio) => [
                      id_persona,
                      {
                        toSqlString: () =>
                          `(SELECT id_acceptacio_avis
                            FROM acceptacions_avis 
                            WHERE form_name = ${connection.escape(
                              acceptacio
                            )})`,
                      },
                      soci.acceptacions[acceptacio],
                    ]),
                  ])
                  .catch(transactionRollback);

              connection
                .query(queryFile("socis/insert__historial_soci"), [
                  [[id_persona, soci.data_alta]],
                ])
                .then(() => {
                  connection
                    .query(queryFile("socis/delete__email_espera"), { email })
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
  const { id } = req.params;

  pool
    .query(queryFile("socis/delete__soci"), [id])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.socis_detall_formacions = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("socis/select__formacions_soci"), [
      id,
      ROLES_IS_JUNTA_DIRECTIVA,
    ])
    .then(([_, formacions]) => res.json(formacions))
    .catch((e) => next(e));
};

exports.socis_detall_projectes = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("socis/select__projectes_soci"), [
      id,
      ROLES_IS_JUNTA_DIRECTIVA,
    ])
    .then(([_, projectes]) =>
      parseAndSendJSON(res, next, projectes, ["directors", "formacions"])
    )
    .catch((e) => next(e));
};

exports.socis_detall_assajos = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("socis/select__assajos_soci"), [
      id,
      ROLES_IS_JUNTA_DIRECTIVA,
    ])
    .then(([_, assajos]) =>
      parseAndSendJSON(res, next, assajos, ["formacions", "projectes"])
    )
    .catch((e) => next(e));
};

exports.socis_detall_acceptacions_get = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("socis/select__acceptacions_soci"), [id])
    .then(([{ acceptacions }]) => parseAndSendJSON(res, next, acceptacions))
    .catch((e) => next(e));
};

exports.socis_detall_acceptacions_put = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;
  /** @type {Object<string, boolean>} */
  const { acceptacions } = req.body;

  pool
    .query(queryFile("socis/insert__acceptacions_soci"), [
      Object.keys(acceptacions).map((acceptacio) => [
        id,
        {
          toSqlString: () =>
            `(SELECT id_acceptacio_avis
              FROM acceptacions_avis
              WHERE form_name = ${pool.escape(acceptacio)})`,
        },
        acceptacions[acceptacio],
      ]),
    ])
    .then(() => res.json(acceptacions))
    .catch((e) => next(e));
};

exports.socis_detall_activitat = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("socis/select__activitat_soci"), [id])
    .then((activitat) => res.json(activitat))
    .catch((e) => next(e));
};

exports.socis_detall_alta = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("socis/insert__historial_soci"), [
      [[id, { toSqlString: () => `CURRENT_DATE` }]],
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.socis_detall_baixa = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("socis/update__baixa_historial_soci"), [id])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.socis_detall_propersassajos = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;
  const { limit } = req.query;

  pool
    .query(queryFile("socis/select__propers_assajos_soci"), [
      id,
      parseInt(limit) || 4,
    ])
    .then((assajos) =>
      parseAndSendJSON(res, next, assajos, [
        "formacions",
        "projectes",
        "moviments",
      ])
    )
    .catch((e) => next(e));
};