const { queryFile } = require("../helpers");

exports.titulars_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("titulars/select__titulars"))
    .then((titulars) => res.json(titulars))
    .catch((e) => next(e));
};
