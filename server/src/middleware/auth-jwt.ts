import { ResponseError } from "common";
import { Pool, RowDataPacket } from "mysql2/promise";
import { ControllerRequestHandler } from "raw-model";
import {
  ROLES_ADMIN,
  ROLES_DIRECCIO_MUSICAL,
  ROLES_JUNTA_DIRECTIVA,
} from "../../../common/common.constants";
import { queryFile } from "../helpers";
import { verifyJWT } from "../utils";

interface UserToken {
  id?: number;
}

interface EmailToken {
  email?: string;
}

type AuthRequestHandler = ControllerRequestHandler<ResponseError | any>;

/*
 * VERIFY FUNCTIONS
 */
export const verifyAccessToken: AuthRequestHandler = (req, res, next) => {
  const { authorization: accessToken } = req.headers;
  const hideMessage = !!res.locals.hideMessage;

  if (!accessToken)
    return res.status(401).send({
      error: {
        status: 401,
        message: "Cal proporcionar un token d’accés.",
        hideMessage,
      },
    });

  verifyJWT(accessToken, (err, decoded: UserToken | EmailToken | undefined) => {
    if (err)
      return res.status(401).send({
        error: {
          status: 401,
          message: "Sense autorizació",
          hideMessage,
        },
      });

    if ((decoded as EmailToken).email)
      return res.status(403).send({
        error: {
          status: 403,
          message: "Encara no has acabat d’introduir les teves dades.",
          okText: "Torna a introduir-les",
          hideMessage,
        },
      });

    res.locals.userId = (decoded as UserToken).id;
    next();
  });
};

export const verifyAccessTokenHidden: AuthRequestHandler = (req, res, next) => {
  res.locals.hideMessage = true;
  return verifyAccessToken(req, res, next);
};

export const verifyEmailToken: AuthRequestHandler = (req, res, next) => {
  const { authorization: accessToken } = req.headers;
  const email = req.body;

  if (!accessToken)
    return res.status(401).send({
      error: {
        status: 401,
        message: "Cal proporcionar un token d’accés.",
      },
    });

  verifyJWT(accessToken, (err, decoded: UserToken | EmailToken | undefined) => {
    if (err || email !== (decoded as EmailToken).email)
      return res.status(403).send({
        error: {
          status: 403,
          ...(!err && email !== (decoded as EmailToken).email
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

    res.locals.email = (decoded as EmailToken).email;
    next();
  });
};

// TODO: Check for null values returned by queries
/*
 * CHECK FUNCTIONS
 */
export const checkIsAuthor: AuthRequestHandler = async (req, res) => {
  const pool: Pool = req.app.get("pool");
  const { id } = req.params;

  const queryUsuari = await pool.query<
    ({ id_usuari: number } & RowDataPacket)[]
  >(queryFile("auth/select__id_usuari"), [id]);

  return queryUsuari[0][0] && res.locals.userId === queryUsuari[0][0].id_usuari;
};

export const checkIsRole: AuthRequestHandler = async (req, res) => {
  const pool: Pool = req.app.get("pool");
  const { userId: id, roles } = res.locals;

  const [[{ es_role }]] = await pool.query<
    ({ es_role: boolean } & RowDataPacket)[]
  >(queryFile("auth/select__exists_roles"), [id, roles]);

  return es_role;
};

/*
 * IS HELPERS
 */
export const isAuthor: AuthRequestHandler = async (req, res, next) =>
  (await checkIsAuthor(req, res, next))
    ? next()
    : res
        .status(403)
        .send({ error: { status: 403, message: "Sense autorització" } });

export const isRole: AuthRequestHandler = async (req, res, next) =>
  (await checkIsRole(req, res, next))
    ? next()
    : res.status(403).send({ error: { status: 403, message: "Sense permís" } });

/*
 * `IS` FUNCTIONS
 */
export const isAuthorOrJuntaDirectiva: AuthRequestHandler = async (
  req,
  res,
  next
) => {
  res.locals.roles = ROLES_JUNTA_DIRECTIVA;
  (await checkIsAuthor(req, res, next)) || (await checkIsRole(req, res, next))
    ? next()
    : res
        .status(403)
        .send({ error: { status: 403, message: "Sense autorització" } });
};

export const isJuntaDirectiva: AuthRequestHandler = async (req, res, next) => {
  res.locals.roles = ROLES_JUNTA_DIRECTIVA;
  await isRole(req, res, next);
};

export const isDireccioMusical: AuthRequestHandler = async (req, res, next) => {
  res.locals.roles = ROLES_DIRECCIO_MUSICAL;
  await isRole(req, res, next);
};

export const isAdmin: AuthRequestHandler = async (req, res, next) => {
  res.locals.roles = ROLES_ADMIN;
  await isRole(req, res, next);
};
