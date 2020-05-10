const { saltHashPassword, signJWT } = require("../utils");

exports.signin = (req, res, next) => {
  const pool = req.app.get("pool");

  const {
    /** @type {string} */ username,
    /** @type {string} */ password,
  } = req.body;

  if (!username || !password)
    return res.status(400).send({
      error: {
        status: 400,
        message: "Cal introduir el nom d’usuari i la contrasenya.",
      },
    });

  pool.query(
    `SELECT id_usuari AS id,
              username,
              nom,
              cognoms,
              es_dona,
              id_persona,
              accepta_proteccio_dades,
              salt,
              encrypted_password,
              (
                  SELECT JSON_ARRAYAGG(role)
                  FROM roles_usuaris
                           INNER JOIN roles USING (id_role)
                  WHERE id_usuari = (SELECT usuaris_complet.id_usuari)
              )         AS roles
       FROM usuaris_complet
                LEFT JOIN persones USING (id_persona)
       WHERE username = ?;`,
    [username],
    (err, [user]) => {
      if (err) next(err);

      if (!user)
        return res.status(404).send({
          error: {
            status: 404,
            message: "L’usuari no s’ha trobat.",
          },
        });

      const { hash } = saltHashPassword({
        password,
        salt: user.salt,
      });

      const passwordIsValid = hash === user.encrypted_password;

      if (!passwordIsValid)
        return res.status(401).send({
          error: {
            status: 401,
            message: "La contrasenya és incorrecta.",
          },
        });

      const accessToken = signJWT({
        payload: { id: user.id },
        expiresIn: 10800, // 3 h
      });

      /** @type {string[]} */
      let authorities = [];
      try {
        authorities = JSON.parse(user.roles).map(
          (role) => "ROLE_" + role.toUpperCase()
        );

        res.status(200).send({
          user: {
            id: user.id,
            username: user.username,
            nom: user.nom,
            cognoms: user.cognoms,
            es_dona: user.es_dona,
            id_persona: user.id_persona,
            accepta_proteccio_dades: user.accepta_proteccio_dades,
            roles: authorities,
          },
          accessToken,
        });
      } catch (e) {
        next(e);
        res.status(500).send({
          error: {
            status: 500,
            message:
              "Hi ha hagut un error en el processament dels rols d’usuari.",
          },
        });
      }
    }
  );
};

exports.email_espera = (req, res, next) => {
  const pool = req.app.get("pool");
  const email = req.body.email;

  pool.query(
    `SELECT COUNT(*) AS count_emails
       FROM emails_espera
       WHERE ?;`,
    { email },
    (err, [{ count_emails }]) => {
      if (err) next(err);

      if (count_emails > 0) {
        const accessToken = signJWT({
          payload: { email },
          expiresIn: 1200, // 20 min
        });

        return res.json({ count: count_emails, accessToken });
      }

      pool.query(
        `SELECT COUNT(*) AS count_persones
           FROM persones
           WHERE ?;`,
        { email },
        (err, [{ count_persones: count }]) => {
          if (err) next(err);

          res.json({
            count: count_emails,
            message:
              count > 0
                ? "L’adreça ja està registrada."
                : "L’adreça no és a la llista d’espera.",
          });
        }
      );
    }
  );
};
