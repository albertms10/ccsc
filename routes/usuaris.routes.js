module.exports = (app) => {
  const connection = app.get("connection");

  app.get("/api/usuaris/:username/first-available-num", (req, res, next) => {
    const username = req.params.username;

    connection.query(
      `SELECT MAX(CAST(REGEXP_SUBSTR(username, '[0-9]*$') AS UNSIGNED)) + 1 AS first_available_num
         FROM usuaris
         WHERE REGEXP_SUBSTR(username, '[a-zA-Z.]+') = ?;`,
      [username],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      }
    );
  });

  app.get("/api/usuaris/:id/agrupacions", (req, res, next) => {
    const id_usuari = req.params.id;

    connection.query(
      `SELECT DISTINCT agrupacions.*
         FROM agrupacions
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
      [id_usuari, id_usuari],
      (err, rows) => {
        if (err) next(err);
        res.send(rows);
      }
    );
  });
};
