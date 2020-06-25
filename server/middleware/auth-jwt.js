const { verifyJWT } = require("../utils");

/*
 * VERIFY FUNCTIONS
 */
const verifyAccessToken = (
  req,
  res,
  next,
  options = { hideMessage: false }
) => {
  /** @type {string} */
  const accessToken = req.headers["x-access-token"];

  if (!accessToken)
    return res.status(401).send({
      error: {
        ...options,
        status: 401,
        message: "Cal proporcionar un token d’accés.",
      },
    });

  verifyJWT(accessToken, (err, decoded) => {
    if (err)
      return res.status(401).send({
        error: {
          ...options,
          status: 401,
          message: "Sense autorizació",
        },
      });

    if (decoded.email)
      return res.status(403).send({
        error: {
          ...options,
          status: 403,
          message: "Encara no has acabat d’introduir les teves dades.",
          okText: "Torna a introduir-les",
          location: {
            pathname: "/donar-alta",
            state: { email: decoded.email },
          },
        },
      });

    req.userId = decoded.id;
    next();
  });
};

const verifyEmailToken = (req, res, next) => {
  /** @type {string} */
  const accessToken = req.headers["x-access-token"];
  const { email } = req.body.soci;

  if (!accessToken)
    return res.status(401).send({
      error: {
        status: 401,
        message: "Cal proporcionar un token d’accés.",
      },
    });

  verifyJWT(accessToken, (err, decoded) => {
    if (err || email !== decoded.email)
      return res.status(403).send({
        error: {
          status: 403,
          message:
            !err && email !== decoded.email
              ? "Les adreces de correu no coincideixen"
              : "Sense autorizació",
          description: "Modifiqueu l’adreça de correu electrònic.",
          okText: "Modificar les dades",
          okOnly: true,
          noAction: true,
        },
      });

    req.email = decoded.email;
    next();
  });
};

/*
 * CHECK FUNCTIONS
 */
const checkIsAuthor = async (req) => {
  const pool = req.app.get("pool");
  /** @type {number} */
  const id_soci = req.params.id;

  const queryUsuari = await pool.query(
    `SELECT id_usuari
       FROM usuaris
                INNER JOIN socis s ON usuaris.id_persona = s.id_soci
       WHERE ?;`,
    { id_soci }
  );

  return queryUsuari[0] && req.userId === queryUsuari[0].id_usuari;
};

const checkIsRole = async (req, roles) => {
  const pool = req.app.get("pool");
  /** @type {number} */
  const id = req.userId;

  const [{ is_role }] = await pool.query(
    `SELECT EXISTS(
                      SELECT *
                      FROM roles
                               INNER JOIN roles_usuaris USING (id_role)
                      WHERE id_usuari = ?
                        AND role IN (?)
                  ) AS is_role;`,
    [id, roles]
  );

  return !!is_role;
};

/*
 * IS HELPERS
 */
const isAuthor = async (req, res, next) =>
  (await checkIsAuthor(req))
    ? next()
    : res
        .status(403)
        .send({ error: { status: 403, message: "Sense autorització" } });

const isRole = async (req, res, next, roles) =>
  (await checkIsRole(req, roles))
    ? next()
    : res.status(403).send({ error: { status: 403, message: "Sense permís" } });

/*
 * ROLES CONSTANTS
 */
const ROLES_IS_JUNTA_DIRECTIVA = [
  "junta_directiva",
  "director_musical",
  "admin",
];
const ROLES_IS_DIRECTOR_MUSICAL = ["director_musical", "admin"];
const ROLES_IS_ADMIN = ["admin"];

/*
 * IS FUNCTIONS
 */
const isAuthorOrJuntaDirectiva = async (req, res, next) =>
  (await checkIsAuthor(req)) ||
  (await checkIsRole(req, ROLES_IS_JUNTA_DIRECTIVA))
    ? next()
    : res
        .status(403)
        .send({ error: { status: 403, message: "Sense autorització" } });

const isJuntaDirectiva = async (req, res, next) =>
  await isRole(req, res, next, ROLES_IS_JUNTA_DIRECTIVA);

const isDirectorMusical = async (req, res, next) =>
  await isRole(req, res, next, ROLES_IS_DIRECTOR_MUSICAL);

const isAdmin = async (req, res, next) =>
  await isRole(req, res, next, ROLES_IS_ADMIN);

module.exports = {
  verifyAccessToken,
  verifyEmailToken,
  isAuthor,
  isJuntaDirectiva,
  isAuthorOrJuntaDirectiva,
  isDirectorMusical,
  isAdmin,
  ROLES_IS_JUNTA_DIRECTIVA,
  ROLES_IS_DIRECTOR_MUSICAL,
  ROLES_IS_ADMIN,
};
