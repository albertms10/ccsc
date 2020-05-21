exports.titulars_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT *
         FROM titulars
         ORDER BY ordre IS NULL, data_inici;`
    )
    .then((titulars) => res.json(titulars))
    .catch((e) => next(e));
};
