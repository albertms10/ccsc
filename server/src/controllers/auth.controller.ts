import { NextFunction, Request, Response } from "express";
import { Usuari } from "model";
import { Pool } from "promise-mysql";
import { queryFile, trySendUser } from "../helpers";
import { saltHashPassword, signJWT } from "../utils";

export const signIn = (req: Request, res: Response, next: NextFunction) => {
  const pool: Pool = req.app.get("pool");
  const {
    user: { username, password },
  } = req.body;

  if (!username || !password)
    return res.status(403).send({
      error: {
        status: 403,
        message: "Introdueix el nom d’usuari i la contrasenya.",
        okOnly: true,
      },
    });

  pool
    .query(queryFile("auth/select__user_info_password"), { username })
    .then(([user]: [Usuari]) => {
      let isValidPassword = false;

      if (user) {
        const { hash } = saltHashPassword({
          password,
          salt: user.salt,
        });

        isValidPassword = hash === user.encrypted_password;
      }

      if (!user || !isValidPassword)
        return res.status(403).send({
          error: {
            status: 403,
            message: "Nom d’usuari o contrasenya incorrectes",
            okOnly: true,
          },
        });

      const accessToken = signJWT({ payload: { id: user.id } });

      trySendUser(res, next, user, accessToken);
    })
    .catch(next);
};

export const emailEspera = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pool: Pool = req.app.get("pool");
  const { email } = req.body;

  pool
    .query(queryFile("auth/select__exists_email_espera"), { email })
    .then(([{ email_exists }]) => {
      if (email_exists) {
        const accessToken = signJWT({
          payload: { email },
          expiresIn: 1200, // 20 min
        });

        return res.json({ exists: !!email_exists, accessToken });
      }

      pool
        .query(queryFile("auth/select__count_persones_email"), { email })
        .then(([{ count }]) => {
          res.json({
            exists: !!email_exists,
            message:
              count > 0
                ? "L’adreça ja està registrada."
                : "L’adreça no és a la llista d’espera.",
          });
        })
        .catch(next);
    })
    .catch(next);
};

export const userInfo = (req: Request, res: Response, next: NextFunction) => {
  const pool: Pool = req.app.get("pool");

  const { userId: id_usuari } = res.locals;
  const { authorization: accessToken } = req.headers;

  pool
    .query(queryFile("auth/select__user_info"), { id_usuari })
    .then(([user]) =>
      user
        ? trySendUser(res, next, user, accessToken)
        : res.status(404).send({
            error: { status: 404, message: "L’usuari no s’ha trobat." },
          })
    )
    .catch(next);
};
