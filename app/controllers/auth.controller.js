const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const connection = require("../../connection");
const saltHashPassword = require("../../utils/saltHashPassword");

exports.signin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .send({ message: "Username or password not provided" });

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

      /**
       * @param {Object} user
       * @param {number} user.id
       * @param {string} user.username
       * @param {string} user.nom
       * @param {string} user.cognoms
       * @param {string} user.salt
       * @param {string} user.encrypted_password
       * @param {string} user.roles
       */
      const user = rows[0];

      if (!user) return res.status(404).send({ message: "User not found" });

      console.log(`Authenticating user ${username}`);

      const { hash } = saltHashPassword({
        password,
        salt: user.salt,
      });

      const passwordIsValid = hash === user.encrypted_password;

      if (!passwordIsValid)
        return res.status(401).send({
          message: "Invalid password",
          accessToken: null,
        });

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

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
        res
          .status(500)
          .send({
            message: "Error during role list processing",
            accessToken: null,
          });
      }
    }
  );
};
