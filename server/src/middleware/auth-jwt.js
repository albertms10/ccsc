const { verifyJWT } = require("../utils");
const { queryFile } = require("../helpers");

/*
 * VERIFY FUNCTIONS
 */
const verifyAccessToken = (req, res, next, { hideMessage = false } = {}) => {
  /** @type {string} */
  const { authorization: accessToken } = req.headers;

  if (!accessToken)
    return res.status(401).send({
      error: {
        status: 401,
        message: "Cal proporcionar un token d’accés.",
        hideMessage,
      },
    });

  verifyJWT(accessToken, (err, decoded) => {
    if (err)
      return res.status(401).send({
        error: {
          status: 401,
          message: "Sense autorizació",
          hideMessage,
        },
      });

    if (decoded.email)
      return res.status(403).send({
        error: {
          status: 403,
          message: "Encara no has acabat d’introduir les teves dades.",
          okText: "Torna a introduir-les",
          location: {
            pathname: "/donar-alta",
            state: { email: decoded.email },
          },
          hideMessage,
        },
      });

    req.userId = decoded.id;
    next();
  });
};

const verifyAccessTokenHidden = (req, res, next) =>
  verifyAccessToken(req, res, next, { hideMessage: true });

const verifyEmailToken = (req, res, next) => {
  /** @type {string} */
  const { authorization: accessToken } = req.headers;
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
          ...(!err && email !== decoded.email
            ? {
                message: "Les adreces de correu no coincideixen",
                description: "Modifiqueu l’adreça de correu electrònic.",
                okText: "Modificar les dades",
                okOnly: true,
                noAction: true,
              }
            : { message: "Sense autorizació" }),
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
  const { id } = req.params;

  const queryUsuari = await pool.query(queryFile("auth/select__id_usuari"), [
    id,
  ]);

  return queryUsuari[0] && req.userId === queryUsuari[0].id_usuari;
};

const checkIsRole = async (req, roles) => {
  const pool = req.app.get("pool");
  /** @type {number} */
  const id = req.userId;

  const [{ is_role }] = await pool.query(
    queryFile("auth/select__exists_roles"),
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
  verifyAccessTokenHidden,
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
