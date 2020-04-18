const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
// TODO És correcte aquest import? Hauria de fer servir el mateix que a l'app del `server.js`?
const connection = require("../../connection");

verifyToken = (req, res, next) => {
  let accessToken = req.headers["x-access-token"];

  if (!accessToken)
    return res.status(403).send({ message: "No token provided!" });

  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });

    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  const id = req.userId;

  connection.query(
    `SELECT COUNT(*) AS es_admin
       FROM roles
                INNER JOIN roles_usuaris USING (id_role)
       WHERE id_usuari = ?
         AND role = 'admin';`,
    [id],
    (err, /** @param {number} rows[].es_admin */ rows) => {
      if (err) next(err);
      if (rows[0].es_admin) {
        next();
        return;
      }

      res.status(403).send({ message: "Require Admin Role!" });
    }
  );
};

userInfo = (req, res, next) => {
  const id = req.userId;
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
      if (rows[0]) {
        const user = rows[0];

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
            message: "Error during role list processing",
            accessToken: null,
          });
        }
      }

      res.status(404).send({ message: "User not found" });
    }
  );
};

module.exports = {
  verifyToken,
  isAdmin,
  userInfo,
};
