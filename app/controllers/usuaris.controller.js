// TODO Part de la lògica d'aquesta funció és compartida amb la d'autorització a auth.controller.js
exports.userInfo = (req, res, next) => {
  const pool = req.app.get("pool");

  /** @type {number} */
  const id = req.userId;
  /** @type {string} */
  const accessToken = req.headers["x-access-token"];

  pool.query(
    `SELECT id_usuari AS id,
              username,
              nom,
              cognoms,
              es_dona,
              (
                  SELECT JSON_ARRAYAGG(role)
                  FROM roles_usuaris
                           INNER JOIN roles USING (id_role)
                  WHERE id_usuari = (SELECT usuaris.id_usuari)
              )         AS roles
       FROM usuaris
                LEFT JOIN persones USING (id_persona)
       WHERE id_usuari = ?`,
    [id],
    (err, rows) => {
      if (err) next(err);

      /** @type {User} */
      const user = rows[0];

      if (user) {
        /** @type {string[]} */
        let authorities = [];
        try {
          authorities = JSON.parse(user.roles).map(
            (role) => "ROLE_" + role.toUpperCase()
          );

          return res.status(200).send({
            user: {
              id: user.id,
              username: user.username,
              nom: user.nom,
              cognoms: user.cognoms,
              es_dona: user.es_dona,
              roles: authorities,
            },
            accessToken,
          });
        } catch (e) {
          next(e);
          res.status(500).send({
            error: {
              status: 500,
              message:
                "Hi ha hagut un error en el processament dels rols d’usuari.",
            },
          });
        }
      }

      res.status(404).send({
        error: {
          status: 404,
          message: "L’usuari no s’ha trobat.",
        },
      });
    }
  );
};

exports.usuaris_detall_firstavailablenum = (req, res, next) => {
  const pool = req.app.get("pool");
  const username = req.params.username;

  pool.query(
    `SELECT MAX(CAST(REGEXP_SUBSTR(username, '[0-9]*$') AS UNSIGNED)) + 1 AS first_available_num
       FROM usuaris
       WHERE REGEXP_SUBSTR(username, '[a-zA-Z.]+') = ?;`,
    [username],
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};

exports.usuaris_detall_agrupacions = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_usuari = req.params.id;

  pool.query(
    `SELECT DISTINCT agrupacions.*
       FROM agrupacions
                INNER JOIN agrupacions_associacio USING (id_agrupacio)
                LEFT JOIN socis_agrupacions USING (id_agrupacio)
                LEFT JOIN socis USING (id_soci)
                LEFT JOIN persones p ON socis.id_soci = p.id_persona
                LEFT JOIN usuaris USING (id_persona)
       WHERE id_usuari = ?
          OR (SELECT role
              FROM roles
                       INNER JOIN roles_usuaris USING (id_role)
                       INNER JOIN usuaris USING (id_usuari)
              WHERE id_usuari = ?
                AND role IN ('junta_directiva', 'admin')) IS NOT NULL;`,
    [id_usuari, id_usuari],
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};
