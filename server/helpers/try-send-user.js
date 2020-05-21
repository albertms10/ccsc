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
    accepta_proteccio_dades,
    roles
  },
  accessToken
) => {
  /** @type {string[]} */
  let authorities = [];
  try {
    authorities = JSON.parse(roles).map((role) => "ROLE_" + role.toUpperCase());

    res.status(200).send({
      user: {
        id,
        username,
        nom,
        cognoms,
        es_dona,
        id_persona,
        accepta_proteccio_dades,
        roles: authorities
      },
      accessToken
    });
  } catch (e) {
    next(e);
    res.status(500).send({
      error: {
        status: 500,
        message: "Hi ha hagut un error en el processament dels rols d’usuari."
      }
    });
  }
};

module.exports = trySendUser;
