const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  /** @type {string} */
  const accessToken = req.headers["x-access-token"];

  if (!accessToken)
    return res.status(403).send({
      error: {
        statusCode: 403,
        message: "Cal proporcionar un token d’accés.",
      },
    });

  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (err)
      return res.status(401).send({
        error: {
          statusCode: 401,
          message: "Sense autorizació",
        },
      });

    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  const connection = req.app.get("connection");

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

      res.status(403).send({
        error: {
          statusCode: 403,
          message: "Cal tenir assignat un rol d’usuari superior.",
        },
      });
    }
  );
};

module.exports = {
  verifyToken,
  isAdmin,
};
