const { queryFile } = require("../helpers");

exports.localitzacions_post = (req, res, next) => {
  const pool = req.app.get("pool");
  const { localitzacio } = req.body;

  pool
    .query(queryFile("localitzacions/insert__localitzacio"), [
      localitzacio.tipus_via,
      localitzacio.carrer,
      localitzacio.numero,
      localitzacio.fins_numero,
      localitzacio.codi_postal,
      localitzacio.gmaps,
      localitzacio.ciutat,
    ])
    .then(() => res.status(204).send())
    .catch((e) => next(e));
};

exports.localitzacions_tipusvies_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("localitzacions/select__tipus_vies"))
    .then((tipus_vies) => res.json(tipus_vies))
    .catch((e) => next(e));
};

exports.localitzacions_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const { id } = req.params;

  pool
    .query(queryFile("localitzacions/select__localitzacio"), [id])
    .then((localitzacio) => res.json(localitzacio))
    .catch((e) => next(e));
};

exports.localitzacions_ciutats_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("localitzacions/select__ciutats"))
    .then((ciutats) => res.json(ciutats))
    .catch((e) => next(e));
};

exports.localitzacions_provincies_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("localitzacions/select__provincies"))
    .then((provincies) => res.json(provincies))
    .catch((e) => next(e));
};

exports.localitzacions_paisos_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("localitzacions/select__paisos"))
    .then((paisos) => res.json(paisos))
    .catch((e) => next(e));
};
