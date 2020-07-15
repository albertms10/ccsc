import { NextFunction, Request, Response } from "express";
import { VerifyErrors } from "jsonwebtoken";
import { Pool } from "promise-mysql";
import { queryFile } from "../helpers";
import { verifyJWT } from "../utils";

interface UserToken {
  id: number;
}

interface EmailToken {
  email: string;
}

/*
 * VERIFY FUNCTIONS
 */
export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
  { hideMessage = false } = {}
) => {
  const { authorization: accessToken } = req.headers;

  if (!accessToken)
    return res.status(401).send({
      error: {
        status: 401,
        message: "Cal proporcionar un token d’accés.",
        hideMessage,
      },
    });

  verifyJWT(
    accessToken,
    (err: VerifyErrors, decoded: UserToken | EmailToken) => {
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
            location: {
              pathname: "/donar-alta",
              state: { email: (decoded as EmailToken).email },
            },
            hideMessage,
          },
        });

      res.locals.userId = (decoded as UserToken).id;
      next();
    }
  );
};

export const verifyAccessTokenHidden = (
  req: Request,
  res: Response,
  next: NextFunction
) => verifyAccessToken(req, res, next, { hideMessage: true });

export const verifyEmailToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization: accessToken } = req.headers;
  const { email } = req.body.soci;

  if (!accessToken)
    return res.status(401).send({
      error: {
        status: 401,
        message: "Cal proporcionar un token d’accés.",
      },
    });

  verifyJWT(accessToken, (err, decoded: UserToken | EmailToken) => {
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

/*
 * CHECK FUNCTIONS
 */
export const checkIsAuthor = async (req: Request, res: Response) => {
  const pool: Pool = req.app.get("pool");
  const { id }: { id?: number } = req.params;

  const queryUsuari = await pool.query(queryFile("auth/select__id_usuari"), [
    id,
  ]);

  return queryUsuari[0] && res.locals.userId === queryUsuari[0].id_usuari;
};

export const checkIsRole = async (
  req: Request,
  res: Response,
  roles: Role[]
) => {
  const pool: Pool = req.app.get("pool");
  const { userId: id } = res.locals;

  const [{ is_role }]: [{ is_role: boolean }] = await pool.query(
    queryFile("auth/select__exists_roles"),
    [id, roles]
  );

  return !!is_role;
};

/*
 * IS HELPERS
 */
export const isAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  (await checkIsAuthor(req, res))
    ? next()
    : res
        .status(403)
        .send({ error: { status: 403, message: "Sense autorització" } });

export const isRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
  roles: Role[]
) =>
  (await checkIsRole(req, res, roles))
    ? next()
    : res.status(403).send({ error: { status: 403, message: "Sense permís" } });

/*
 * ROLES
 */
type Role = "usuari" | "junta_directiva" | "director_musical" | "admin";

export const ROLES_IS_JUNTA_DIRECTIVA: Role[] = [
  "junta_directiva",
  "director_musical",
  "admin",
];
export const ROLES_IS_DIRECTOR_MUSICAL: Role[] = ["director_musical", "admin"];
export const ROLES_IS_ADMIN: Role[] = ["admin"];

/*
 * `IS` FUNCTIONS
 */
export const isAuthorOrJuntaDirectiva = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  (await checkIsAuthor(req, res)) ||
  (await checkIsRole(req, res, ROLES_IS_JUNTA_DIRECTIVA))
    ? next()
    : res
        .status(403)
        .send({ error: { status: 403, message: "Sense autorització" } });

export const isJuntaDirectiva = async (
  req: Request,
  res: Response,
  next: NextFunction
) => await isRole(req, res, next, ROLES_IS_JUNTA_DIRECTIVA);

export const isDirectorMusical = async (
  req: Request,
  res: Response,
  next: NextFunction
) => await isRole(req, res, next, ROLES_IS_DIRECTOR_MUSICAL);

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => await isRole(req, res, next, ROLES_IS_ADMIN);
