exports.establiments_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT *
         FROM establiments;`
    )
    .then((establiments) => res.json(establiments))
    .catch((e) => next(e));
};

exports.establiments_detall_esdeveniments = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_establiment = req.params.id;

  pool
    .query(
        `SELECT *
         FROM establiments
                  INNER JOIN localitzacions l ON establiments.id_establiment = l.id_localitzacio
                  INNER JOIN esdeveniments USING (id_localitzacio)
         WHERE ?;`,
      { id_establiment }
    )
    .then((establiment) => res.json(establiment))
    .catch((e) => next(e));
};
