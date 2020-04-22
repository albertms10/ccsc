const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
// TODO És correcte aquest import? Hauria de fer servir el mateix que a l'app del `server.js`?
const connection = require("../../connection");

verifyToken = (req, res, next) => {
  /** @type {string} */
  const accessToken = req.headers["x-access-token"];

  if (!accessToken)
    return res
      .status(403)
      .send({ message: "Cal proporcionar un token d’accés." });

  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Sense autorizació" });

    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  /** @type {number} */
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

      res
        .status(403)
        .send({ message: "Cal tenir assignat un rol d’usuari superior." });
    }
  );
};

module.exports = {
  verifyToken,
  isAdmin,
};
