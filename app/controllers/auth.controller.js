const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const saltHashPassword = require("../utils/salt-hash-password");

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

  // TODO Aquesta consulta hauria d'estar a un endpoint concret?
  pool.query(
    `SELECT id_usuari AS id,
              username,
              nom,
              cognoms,
              es_dona,
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
    (err, rows) => {
      if (err) next(err);

      /** @type {User} */
      const user = rows[0];

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

      /** @type {string} */
      const accessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 10800, // 3 hours
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
