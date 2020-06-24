const { queryFile, parseAndSendJSON } = require("../helpers");

exports.moviments_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("moviments/select__moviments"))
    .then((moviments) => parseAndSendJSON(res, next, moviments, ["projectes"]))
    .catch((e) => next(e));
};

exports.moviments_post = (req, res, next) => {
  const pool = req.app.get("pool");
  const { moviment } = req.body;

  pool
    .query(queryFile("moviments/insert__moviment"), [
      [
        [
          moviment.id_obra,
          moviment.ordre || {
            toSqlString: () =>
              `(SELECT MAX(ordre) + 1 FROM (SELECT * FROM moviments) m WHERE id_obra = ${pool.escape(
                moviment.id_obra
              )})`,
          },
          moviment.titol,
          moviment.durada,
        ],
      ],
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.moviments_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("moviments/select__moviment"), [id])
    .then(([moviment]) => res.json(moviment))
    .catch((e) => next(e));
};

exports.moviments_detall_delete = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("moviments/delete__moviment"), [id])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
