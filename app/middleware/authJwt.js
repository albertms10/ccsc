const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const connection = require("../../connection");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).send({ message: "No token provided!" });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });

    req.idUsuari = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  connection.query(
    `SELECT COUNT(*) AS es_admin
       FROM roles
                INNER JOIN roles_usuaris USING (id_role)
       WHERE id_usuari = ?
         AND role = 'admin';`,
    [req.idUsuari],
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

module.exports = {
  verifyToken,
  isAdmin,
};
