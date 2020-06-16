const { queryFile } = require("../helpers");

exports.establiments_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(queryFile("establiments/select__establiments"))
    .then((establiments) => res.json(establiments))
    .catch((e) => next(e));
};

exports.establiments_detall_esdeveniments = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_establiment = req.params.id;

  pool
    .query(queryFile("establiments/select__esdeveniments_establiment"), {
      id_establiment,
    })
    .then((establiment) => res.json(establiment))
    .catch((e) => next(e));
};
