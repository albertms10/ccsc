const { queryFile, trySendUser } = require("../helpers");
const { saltHashPassword, signJWT } = require("../utils");

exports.signin = (req, res, next) => {
  const pool = req.app.get("pool");
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

      const accessToken = signJWT({
        payload: { id: user.id },
        expiresIn: 10800, // 3 h
      });

      trySendUser(res, next, user, accessToken);
    })
    .catch((e) => next(e));
};

exports.email_espera = (req, res, next) => {
  const pool = req.app.get("pool");
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
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
};

exports.userInfo = (req, res, next) => {
  const pool = req.app.get("pool");

  /** @type {number} */
  const id_usuari = req.userId;
  /** @type {string} */
  const accessToken = req.headers["authorization"];

  pool
    .query(queryFile("auth/select__user_info"), { id_usuari })
    .then(([user]) =>
      user
        ? trySendUser(res, next, user, accessToken)
        : res.status(404).send({
            error: { status: 404, message: "L’usuari no s’ha trobat." },
          })
    )
    .catch((e) => next(e));
};
