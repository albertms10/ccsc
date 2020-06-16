const { queryFile } = require("../helpers");

exports.esdeveniments_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("esdeveniments/select__esdeveniments"))
    .then((esdeveniments) => res.json(esdeveniments))
    .catch((e) => next(e));
};

exports.esdeveniments_estatsconfirmacio = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("esdeveniments/select__estats_confirmacio"))
    .then((estats) => res.json(estats))
    .catch((e) => next(e));
};

exports.esdeveniments_detall_assistents_get = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_esdeveniment = req.params.id;

  pool
    .query(queryFile("esdeveniments/select__assistents_esdeveniment"), {
      id_esdeveniment,
    })
    .then((assistents) => res.json(assistents))
    .catch((e) => next(e));
};

exports.esdeveniments_detall_assistents_put = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_esdeveniment = req.params.id;
  const { id_soci, id_estat_confirmacio, retard } = req.body;

  pool
    .query(queryFile("esdeveniments/insert__esdeveniment_esdeveniment"), [
      [[id_esdeveniment, id_soci, id_estat_confirmacio, retard]],
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
