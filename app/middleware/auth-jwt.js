const { verifyJWT } = require("../utils");

const verifyAccessToken = (req, res, next) => {
  /** @type {string} */
  const accessToken = req.headers["x-access-token"];

  if (!accessToken)
    return res.status(403).send({
      error: {
        status: 403,
        message: "Cal proporcionar un token d’accés.",
      },
    });

  verifyJWT(accessToken, (err, decoded) => {
    if (err)
      return res.status(401).send({
        error: {
          status: 401,
          message: "Sense autorizació",
        },
      });

    req.userId = decoded.id;
    next();
  });
};

const verifyEmailToken = (req, res, next) => {
  /** @type {string} */
  const accessToken = req.headers["x-access-token"];
  const email = req.body.email;

  if (!accessToken)
    return res.status(403).send({
      error: {
        status: 403,
        message: "Cal proporcionar un token d’accés.",
      },
    });

  verifyJWT(accessToken, (err, decoded) => {
    if (err || email !== decoded.email)
      return res.status(401).send({
        error: {
          status: 401,
          message: "Sense autorizació",
        },
      });

    req.email = decoded.email;
    next();
  });
};

const isAuthor = (req, res, next) => {
  if (req.userId !== parseInt(req.params.id))
    return res
      .status(401)
      .send({ error: { status: 401, message: "Sense autorització" } });

  next();
};

const isRole = (req, res, next, roles) => {
  const pool = req.app.get("pool");

  /** @type {number} */
  const id = req.userId;

  pool.query(
    `SELECT COUNT(*) AS es_admin
       FROM roles
                INNER JOIN roles_usuaris USING (id_role)
       WHERE id_usuari = ?
         AND role IN (?);`,
    [id, roles],
    (err, [{ es_admin }]) => {
      if (err) next(err);
      if (es_admin) {
        next();
        return;
      }

      res.status(403).send({
        error: {
          status: 403,
          message: "Cal tenir assignat un rol superior d’usuari.",
        },
      });
    }
  );
};

const isJuntaDirectiva = (req, res, next) =>
  isRole(req, res, next, ["junta_directiva", "director_musical", "admin"]);

const isDirectorMusical = (req, res, next) =>
  isRole(req, res, next, ["director_musical", "admin"]);

const isAdmin = (req, res, next) => isRole(req, res, next, ["admin"]);

module.exports = {
  verifyAccessToken,
  verifyEmailToken,
  isAuthor,
  isJuntaDirectiva,
  isDirectorMusical,
  isAdmin,
};
