const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const connection = require("../../connection");
const saltHashPassword = require("../../utils/salt-hash-password");

exports.signin = (req, res, next) => {
  const {
    /** @type {string} */ username,
    /** @type {string} */ password,
  } = req.body;

  if (!username || !password)
    return res.status(400).send({
      error: {
        statusCode: 400,
        message: "Cal introduir el nom d’usuari i la contrasenya.",
      },
    });

  // TODO Aquesta consulta hauria d'estar a un endpoint concret?
  connection.query(
    `SELECT id_usuari AS id,
              username,
              nom,
              cognoms,
              salt,
              encrypted_password,
              (
                  SELECT JSON_ARRAYAGG(role)
                  FROM roles_usuaris
                           INNER JOIN roles USING (id_role)
                  WHERE id_usuari = (SELECT usuaris.id_usuari)
              )         AS roles
       FROM usuaris
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
            statusCode: 404,
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
            statusCode: 401,
            message: "La contrasenya és incorrecta.",
          },
        });

      /** @type {string} */
      const token = jwt.sign({ id: user.id }, config.secret, {
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
            roles: authorities,
          },
          accessToken: token,
        });
      } catch (e) {
        next(e);
        res.status(500).send({
          error: {
            statusCode: 500,
            message:
              "Hi ha hagut un error en el processament dels rols d’usuari.",
          },
        });
      }
    }
  );
};
