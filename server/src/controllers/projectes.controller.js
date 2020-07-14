const { parseAndSendJSON, queryFile } = require("../helpers");

exports.projectes_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("projectes/select__count_projectes"))
    .then(([{ count }]) => res.json(count))
    .catch((e) => next(e));
};

exports.projectes_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  // TODO: Com tenir en compte els projectes que s’allarguin més d‘un curs?
  pool
    .query(queryFile("projectes/select__historial_projectes"))
    .then((historial) => res.json(historial))
    .catch((e) => next(e));
};

exports.projectes_checkinicials = (req, res, next) => {
  const pool = req.app.get("pool");
  const { inicials } = req.params;

  pool
    .query(queryFile("projectes/select__exists_inicials_projecte"), {
      inicials,
    })
    .then(([{ disponible }]) => res.json(!!disponible))
    .catch((e) => next(e));
};

exports.projectes_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("projectes/select__projecte"), [id])
    .then(([projecte]) =>
      parseAndSendJSON(res, next, projecte, ["directors", "formacions"])
    )
    .catch((e) => next(e));
};

exports.projectes_post = async (req, res, next) => {
  const pool = req.app.get("pool");
  const { projecte } = req.body;

  const connection = await pool.getConnection();

  const transactionRollback = (e) => connection.rollback().then(() => next(e));

  connection.beginTransaction().then(() =>
    connection
      .query(queryFile("projectes/insert__projectes"), [
        [
          [
            projecte.titol,
            projecte.descripcio,
            projecte.inicials,
            projecte.color,
            ...projecte.data,
            projecte.id_curs,
          ],
        ],
      ])
      .then(async ({ insertId: id_projecte }) => {
        try {
          if (projecte.formacions.length > 0)
            await connection.query(
              queryFile("projectes/insert__projectes_formacions"),
              [projecte.formacions.map((formacio) => [id_projecte, formacio])]
            );
        } catch (e) {
          transactionRollback(e);
        } finally {
          connection.commit();
          res.status(204).send();
        }
      })
      .catch(transactionRollback)
  );
};

exports.projectes_delete = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("projectes/delete__projecte"), [id])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.projectes_detall_concerts = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("projectes/select__concerts_projecte"), [id])
    .then((concerts) => res.json(concerts))
    .catch((e) => next(e));
};

exports.projectes_detall_participants = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("projectes/select__participants_projecte"), [id])
    .then((participants) => res.json(participants))
    .catch((e) => next(e));
};

exports.projectes_detall_assajos_post = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id: id_projecte } = req.params;
  const { id_assaig } = req.body;

  pool
    .query(queryFile("assajos/insert__assajos_projectes"), [
      [[id_assaig, id_projecte]],
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.projectes_detall_moviments_post = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id: id_projecte } = req.params;
  const { id_moviment } = req.body;

  pool
    .query(queryFile("projectes/insert__moviments_projecte"), [
      [[id_moviment, id_projecte]],
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.projectes_detall_moviments_delete = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id_projecte, id_moviment } = req.params;

  pool
    .query(queryFile("projectes/delete__moviment_projecte"), [
      id_projecte,
      id_moviment,
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
