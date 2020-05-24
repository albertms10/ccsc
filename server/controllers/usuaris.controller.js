exports.usuaris_detall_firstavailablenum = (req, res, next) => {
  const pool = req.app.get("pool");
  const username = req.params.username;

  pool
    .query(
        `SELECT MAX(
                        CAST(
                                SUBSTR(username, LOCATE(?, username) + LENGTH(?)) AS UNSIGNED
                            )
                    ) + 1 AS first_available_num
         FROM usuaris
         WHERE LOCATE(?, username) = 1;`,
      [username, username, username]
    )
    .then(([{ first_available_num }]) =>
      res.json(parseInt(first_available_num || 0))
    )
    .catch((e) => next(e));
};
