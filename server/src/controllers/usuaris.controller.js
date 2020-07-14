const { queryFile } = require("../helpers");

exports.usuaris_detall_firstavailablenum = (req, res, next) => {
  const pool = req.app.get("pool");
  const { username } = req.params;

  pool
    .query(queryFile("usuaris/select__first_available_num_usuari"), [username])
    .then(([_, [{ first_available_num }]]) =>
      res.json(parseInt(first_available_num || 0))
    )
    .catch((e) => next(e));
};
