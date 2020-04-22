const connection = require("../../connection");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

// TODO Part de la lògica d'aquesta funció és compartida amb la d'autorització a auth.controller.js
exports.userInfo = (req, res, next) => {
  /** @type {number} */
  const id = req.userId;
  /** @type {string} */
  const accessToken = req.headers["x-access-token"];

  connection.query(
    `SELECT id_usuari AS id,
            username,
            nom,
            cognoms,
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
              roles: authorities,
            },
            accessToken,
          });
        } catch (e) {
          next(e);
          res.status(500).send({
            error: {
              statusCode: 500,
              message:
                "Hi ha hagut un error en el processament dels rols d’usuari.",
            },
          });
        }
      }

      res.status(404).send({
        error: {
          statusCode: 404,
          message: "L’usuari no s’ha trobat.",
        },
      });
    }
  );
};
