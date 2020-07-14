const { queryFile } = require("../helpers");

exports.concerts_count = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("concerts/select__count_concerts"))
    .then(([{ count }]) => res.json(count))
    .catch((e) => next(e));
};

exports.concerts_historial = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("concerts/select__historial_concerts"))
    .then((historial) => res.json(historial))
    .catch((e) => next(e));
};
