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
    estat_actiu,
    roles
  },
  accessToken
) => {
  if (!JSON.parse(estat_actiu))
    return res.status(401).send({
      error: {
        status: 401,
        message: "Soci inactiu",
        description:
          "Cal que un membre de la Junta Directiva torni a donar-te dalta.",
        okText: "D’acord",
        okOnly: true,
        noAction: true
      }
    });

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
