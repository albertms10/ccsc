import * as bcrypt from "bcrypt";
import { ResponseError } from "common";
import { Usuari } from "model";
import { Pool, RowDataPacket } from "mysql2/promise";
import {
  ControllerRequestHandler,
  EmailResponse,
  UsernamePasswordPost,
} from "server-model";
import { queryFile, trySendUser } from "../helpers";
import { signJWT } from "../utils";

export const signIn: ControllerRequestHandler<
  Usuari | ResponseError,
  UsernamePasswordPost
> = (req, res, next) => {
  const pool: Pool = req.app.get("pool");
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(403).send({
      error: {
        status: 403,
        message: "Introdueix el nom d’usuari i la contrasenya.",
        okOnly: true,
      },
    });

  pool
    .query<(Usuari & RowDataPacket)[]>(
      queryFile("auth/select__user_info_password"),
      { username }
    )
    .then(async ([[user]]) => {
      const isHashValid = await bcrypt.compare(
        password,
        (user && user.hash) || ""
      );

      if (!user || !isHashValid)
        return res.status(403).send({
          error: {
            status: 403,
            message: "Nom d’usuari o contrasenya incorrectes",
            okOnly: true,
          },
        });

      delete user.hash;

      const accessToken = signJWT({ id: user.id_usuari }, { expiresIn: 10800 });

      trySendUser(res, next, user, accessToken);
    })
    .catch(next);
};

export const emailEspera: ControllerRequestHandler<EmailResponse, string> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const email = req.body;

  pool
    .query<({ email_exists: boolean } & RowDataPacket)[]>(
      queryFile("auth/select__exists_email_espera"),
      [email]
    )
    .then(([[{ email_exists }]]) =>
      res.json({
        exists: email_exists,
        ...(email_exists
          ? { accessToken: signJWT({ email }, { expiresIn: 1200 }) }
          : {
              message:
                "L’adreça no és a la llista d’espera o ja està registrada.",
            }),
      })
    )
    .catch(next);
};

export const userInfo: ControllerRequestHandler<Usuari | ResponseError> = (
  req,
  res,
  next
) => {
  const pool: Pool = req.app.get("pool");
  const { userId: id_usuari } = res.locals;
  const { authorization: accessToken } = req.headers;

  pool
    .query<(Usuari & RowDataPacket)[]>(queryFile("auth/select__user_info"), {
      id_usuari,
    })
    .then(([[user]]) =>
      user
        ? trySendUser(res, next, user, accessToken!)
        : res.status(404).send({
            error: { status: 404, message: "L’usuari no s’ha trobat." },
          })
    )
    .catch(next);
};
