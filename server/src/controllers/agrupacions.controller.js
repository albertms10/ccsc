const { parseAndSendJSON, queryFile } = require("../helpers");

exports.agrupacions_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("agrupacions/select__agrupacions"))
    .then(([agrupacio]) => res.json(agrupacio))
    .catch((e) => next(e));
};

exports.agrupacions_avisos_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const { name } = req.params;

  pool
    .query(queryFile("agrupacions/select__avisos_agrupacio"), [name])
    .then(([avis]) =>
      parseAndSendJSON(res, next, avis, ["seccions", "acceptacions"])
    )
    .catch((e) => next(e));
};

exports.agrupacions_cursos = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("agrupacions/select__cursos_agrupacions"))
    .then((cursos) => res.json(cursos))
    .catch((e) => next(e));
};
