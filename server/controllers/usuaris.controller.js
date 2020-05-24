exports.usuaris_detall_firstavailablenum = (req, res, next) => {
  const pool = req.app.get("pool");
  const username = req.params.username;

  pool
    .query(
        `SELECT MAX(
                        CAST(
                                SUBSTR(username, LOCATE(?, username) + LENGTH(?)) AS UNSIGNED
                            )
                    ) + 1 AS first_available_num
         FROM usuaris
         WHERE LOCATE(?, username) = 1;`,
      [username, username, username]
    )
    .then(([{ first_available_num }]) =>
      res.json(parseInt(first_available_num || 0))
    )
    .catch((e) => next(e));
};

exports.usuaris_detall_agrupacions = (req, res, next) => {
  const pool = req.app.get("pool");
  const id_usuari = req.params.id;

  pool
    .query(
        `SELECT DISTINCT id_agrupacio,
                         agrupacions.nom,
                         nom_curt,
                         descripcio,
                         num_persones,
                         tipus_agrupacions.nom AS tipus_agrupacio
         FROM agrupacions
                  INNER JOIN tipus_agrupacions USING (id_tipus_agrupacio)
                  INNER JOIN agrupacions_associacio USING (id_agrupacio)
                  LEFT JOIN socis_agrupacions USING (id_agrupacio)
                  LEFT JOIN socis USING (id_soci)
                  LEFT JOIN persones p ON socis.id_soci = p.id_persona
                  LEFT JOIN usuaris USING (id_persona)
         WHERE id_usuari = ?
            OR (SELECT role
                FROM roles
                         INNER JOIN roles_usuaris USING (id_role)
                         INNER JOIN usuaris USING (id_usuari)
                WHERE id_usuari = ?
                  AND role IN ('junta_directiva', 'admin')) IS NOT NULL;`,
      [id_usuari, id_usuari]
    )
    .then((agrupacions) => res.json(agrupacions))
    .catch((e) => next(e));
};
