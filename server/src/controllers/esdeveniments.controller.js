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
  const { id } = req.params;

  pool
    .query(queryFile("esdeveniments/select__assistents_esdeveniment"), [id])
    .then((assistents) => res.json(assistents))
    .catch((e) => next(e));
};

exports.esdeveniments_detall_assistents_put = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id: id_esdeveniment } = req.params;
  const { id_soci, id_estat_confirmacio, amb_retard } = req.body;

  pool
    .query(queryFile("esdeveniments/insert__assistents_esdeveniments"), [
      [[id_esdeveniment, id_soci, id_estat_confirmacio, amb_retard]],
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};
