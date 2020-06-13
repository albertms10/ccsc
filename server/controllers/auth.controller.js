const { trySendUser } = require("../helpers");
const { saltHashPassword, signJWT } = require("../utils");

exports.signin = (req, res, next) => {
  const pool = req.app.get("pool");

  const {
    /** @type {string} */ username,
    /** @type {string} */ password
  } = req.body;

  if (!username || !password)
    return res.status(401).send({
      error: {
        status: 401,
        message: "Introdueix el nom d’usuari i la contrasenya."
      }
    });

  pool
    .query(
        `SELECT id_usuari AS id,
                username,
                nom,
                cognoms,
                es_dona,
                id_persona,
                salt,
                encrypted_password,
                (
                    SELECT JSON_ARRAYAGG(role)
                    FROM roles_usuaris
                             INNER JOIN roles USING (id_role)
                    WHERE id_usuari = (SELECT uc.id_usuari)
                )         AS roles,
                (
                    SELECT IFNULL(JSON_ARRAYAGG(unique_name), '[]')
                    FROM avisos
                             INNER JOIN tipus_avisos USING (id_tipus_avis)
                             INNER JOIN acceptacions_avis av USING (id_avis)
                    WHERE requerida IS TRUE
                      AND NOT EXISTS(
                            SELECT *
                            FROM socis_acceptacions
                            WHERE id_acceptacio_avis = (SELECT av.id_acceptacio_avis)
                              AND accepta IS TRUE
                              AND id_soci = (SELECT p.id_persona)
                        )
                )         AS avisos,
                IF(
                        EXISTS(
                                SELECT *
                                FROM socis
                                         INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
                                WHERE id_soci = (SELECT id_persona)
                                  AND CURRENT_DATE
                                    BETWEEN data_alta
                                    AND IFNULL(DATE_SUB(data_baixa, INTERVAL 1 DAY), CURRENT_DATE)
                                ORDER BY data_alta DESC
                            ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)
                    )     AS estat_actiu
         FROM usuaris_complet uc
                  LEFT JOIN persones p USING (id_persona)
         WHERE ?;`,
      { username }
    )
    .then(([user]) => {
      let passwordIsValid = false;

      if (user) {
        const { hash } = saltHashPassword({
          password,
          salt: user.salt
        });

        passwordIsValid = hash === user.encrypted_password;
      }

      if (!user || !passwordIsValid)
        return res.status(401).send({
          error: {
            status: 401,
            message: "Nom d’usuari o contrasenya incorrectes"
          }
        });

      const accessToken = signJWT({
        payload: { id: user.id },
        expiresIn: 10800 // 3 h
      });

      trySendUser(res, next, user, accessToken);
    })
    .catch((e) => next(e));
};

exports.email_espera = (req, res, next) => {
  const pool = req.app.get("pool");
  const email = req.body.email;

  pool
    .query(
        `SELECT EXISTS(
                        SELECT *
                        FROM emails_espera
                        WHERE ?
                    ) AS email_exists;`,
      { email }
    )
    .then(([{ email_exists }]) => {
      if (email_exists) {
        const accessToken = signJWT({
          payload: { email },
          expiresIn: 1200 // 20 min
        });

        return res.json({ exists: !!email_exists, accessToken });
      }

      pool
        .query(
            `SELECT COUNT(*) AS count
             FROM persones
             WHERE ?;`,
          { email }
        )
        .then(([{ count }]) => {
          res.json({
            exists: !!email_exists,
            message:
              count > 0
                ? "L’adreça ja està registrada."
                : "L’adreça no és a la llista d’espera."
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
  const accessToken = req.headers["x-access-token"];

  pool
    .query(
        `SELECT id_usuari AS id,
                username,
                nom,
                cognoms,
                es_dona,
                id_persona,
                (
                    SELECT JSON_ARRAYAGG(role)
                    FROM roles_usuaris
                             INNER JOIN roles USING (id_role)
                    WHERE id_usuari = (SELECT u.id_usuari)
                )         AS roles,
                (
                    SELECT IFNULL(JSON_ARRAYAGG(unique_name), '[]')
                    FROM avisos
                             INNER JOIN tipus_avisos USING (id_tipus_avis)
                             INNER JOIN acceptacions_avis av USING (id_avis)
                    WHERE requerida IS TRUE
                      AND NOT EXISTS(
                            SELECT *
                            FROM socis_acceptacions
                            WHERE id_acceptacio_avis = (SELECT av.id_acceptacio_avis)
                              AND accepta IS TRUE
                              AND id_soci = (SELECT p.id_persona)
                        )
                )         AS avisos,
                IF(
                        EXISTS(
                                SELECT *
                                FROM socis
                                         INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
                                WHERE id_soci = (SELECT id_persona)
                                  AND CURRENT_DATE
                                    BETWEEN data_alta
                                    AND IFNULL(DATE_SUB(data_baixa, INTERVAL 1 DAY), CURRENT_DATE)
                                ORDER BY data_alta DESC
                            ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)
                    )     AS estat_actiu
         FROM usuaris u
                  LEFT JOIN persones p USING (id_persona)
         WHERE ?`,
      { id_usuari }
    )
    .then(([user]) =>
      user
        ? trySendUser(res, next, user, accessToken)
        : res.status(404).send({
          error: { status: 404, message: "L’usuari no s’ha trobat." }
        })
    )
    .catch((e) => next(e));
};
