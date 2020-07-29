import { NextFunction, Request, Response } from "express";
import { Pool } from "promise-mysql";
import { queryFile, trySendUser } from "../helpers";
import { saltHashPassword, signJWT } from "../utils";

export const signin = (req: Request, res: Response, next: NextFunction) => {
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
    .then(([user]) => {
      let passwordIsValid = false;

      if (user) {
        const { hash } = saltHashPassword({
          password,
          salt: user.salt,
        });

        passwordIsValid = hash === user.encrypted_password;
      }

      if (!user || !passwordIsValid)
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

export const email_espera = (
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

  const { userId } = res.locals;
  const { authorization: accessToken } = req.headers;

  pool
    .query(queryFile("auth/select__user_info"), [userId])
    .then(([user]) =>
      user
        ? trySendUser(res, next, user, accessToken)
        : res.status(404).send({
            error: { status: 404, message: "L’usuari no s’ha trobat." },
          })
    )
    .catch(next);
};
