const { parseAndSendJSON, queryFile } = require("../helpers");

exports.assajos_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_assaig = req.params.id;

  pool
    .query(queryFile("assajos/select__assaig"), { id_assaig })
    .then(([assaig]) =>
      parseAndSendJSON(res, next, assaig, ["formacions", "projectes"])
    );
};

exports.assajos_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("assajos/select__count_assajos"))
    .then(([{ assajos_count }]) => res.json(assajos_count))
    .catch((e) => next(e));
};

exports.assajos_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("assajos/select__historial_assajos"))
    .then((historial) => res.json(historial))
    .catch((e) => next(e));
};

exports.assajos_post = async (req, res, next) => {
  const pool = req.app.get("pool");
  const assaig = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e) => connection.rollback().then(() => next(e));

  connection
    .beginTransaction()
    .then(() => {
      connection
        .query(queryFile("assajos/insert__esdeveniment"), [
          [[assaig.dia_inici, ...assaig.hora]]
        ])
        .then(({ insertId: id_esdeveniment }) => {
          connection
            .query(queryFile("assajos/insert__esdeveniment_musical"), [
              [[id_esdeveniment]]
            ])
            .then(() => {
              connection
                .query(queryFile("assajos/insert__assaig"), [
                  [
                    [
                      id_esdeveniment,
                      assaig.es_general || false,
                      assaig.es_extra || false
                    ]
                  ]
                ])
                .then(async () => {
                  try {
                    if (assaig.formacions.length > 0)
                      await connection.query(
                        queryFile("assajos/insert__assaig_formacio"),
                        [
                          assaig.formacions.map((formacio) => [
                            id_esdeveniment,
                            formacio
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
    .query(queryFile("assajos/delete__assaig"), [id_assaig])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.assajos_detall_convocats = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_assaig = req.params.id;

  pool
    .query(queryFile("assajos/select__convocats_assaig"), [id_assaig])
    .then(([_, convocats]) =>
      parseAndSendJSON(res, next, convocats, ["retard"])
    )
    .catch((e) => next(e));
};

exports.assajos_detall_veus_get = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_assaig = req.params.id;

  pool
    .query(queryFile("assajos/select__veus_assaig"), [id_assaig])
    .then((veus) => parseAndSendJSON(res, next, veus, ["convocada"]))
    .catch((e) => next(e));
};

exports.assajos_detall_veus_post = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_assaig = req.params.id;
  const { id_veu } = req.body;

  pool
    .query(queryFile("assajos/insert__veus_assaig"), [[[id_assaig, id_veu]]])
    .then((veus) => res.json(veus))
    .catch((e) => next(e));
};

exports.assajos_detall_veus_delete = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id_assaig, id_veu } = req.params;

  pool
    .query(queryFile("assajos/delete__veus_assaig"), [id_assaig, id_veu])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
