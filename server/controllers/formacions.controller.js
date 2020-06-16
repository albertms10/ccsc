const { parseAndSendJSON, queryFile } = require("../helpers");

exports.formacions_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id: id_formacio } = req.params;

  pool
    .query(queryFile("formacions/select__formacio"), { id_formacio })
    .then((rows) => res.json(rows))
    .catch((e) => next(e));
};

exports.formacions_detall_esdeveniments = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id: id_formacio } = req.params;

  pool
    .query(queryFile("formacions/select__esdeveniments_formacio"), [
      id_formacio,
      id_formacio,
      2020, // TODO: Refaccionar l’any
      id_formacio,
    ])
    .then((esdeveniments) =>
      parseAndSendJSON(res, next, esdeveniments, ["projectes"])
    )
    .catch((e) => next(e));
};

exports.formacions_detall_assajos = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id: id_formacio } = req.params;

  pool
    .query(queryFile("formacions/select__assajos_formacio"), { id_formacio })
    .then((assajos) =>
      parseAndSendJSON(res, next, assajos, ["formacions", "projectes"])
    )
    .catch((e) => next(e));
};

exports.formacions_detall_concerts = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id: id_formacio } = req.params;

  pool
    .query(queryFile("formacions/select__concerts_formacio"), { id_formacio })
    .then((concerts) => res.json(concerts))
    .catch((e) => next(e));
};

exports.formacions_detall_projectes = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id: id_formacio } = req.params;

  pool
    .query(queryFile("formacions/select__projectes_formacio"), [id_formacio])
    .then(([_, projectes]) =>
      parseAndSendJSON(res, next, projectes, ["directors", "formacions"])
    )
    .catch((e) => next(e));
};

exports.formacions_detall_integrants = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id: id_formacio } = req.params;

  pool
    .query(queryFile("formacions/select__integrants_formacio"), { id_formacio })
    .then((integrants) => res.json(integrants))
    .catch((e) => next(e));
};
