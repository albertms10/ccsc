const trySendUser = (
  res,
  next,
  {
    id,
    username,
    nom,
    cognoms,
    es_dona,
    id_persona,
    avisos,
    roles
  },
  accessToken
) => {
  /** @type {string[]} */
  let authorities = [];
  try {
    authorities = JSON.parse(roles).map((role) => "ROLE_" + role.toUpperCase());
    avisos = JSON.parse(avisos);

    res.send({
      user: {
        id,
        username,
        nom,
        cognoms,
        es_dona,
        id_persona,
        avisos,
        roles: authorities
      },
      accessToken
    });
  } catch (e) {
    next(e);
    res.status(500).send({
      error: {
        status: 500,
        message: "Hi ha hagut un error en el processament de les dades."
      }
    });
  }
};

module.exports = trySendUser;
