exports.esdeveniments_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT id_esdeveniment,
              dia_inici,
              hora_inici,
              dia_final,
              hora_final,
              id_estat_esdeveniment,
              (
                  SELECT estat
                  FROM estats_confirmacio
                  WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)
              )     AS estat_esdeveniment,
              id_localitzacio,
              id_estat_localitzacio,
              (
                  SELECT estat
                  FROM estats_confirmacio
                  WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)
              )     AS estat_localitzacio,
              id_esdeveniment_ajornat,
              IF(id_assaig, 'assaig',
                 IF(id_concert, 'concert',
                    IF(id_assemblea, 'assemblea',
                       IF(id_reunio, 'reunió', NULL)
                        )
                     )
                  ) AS tipus,
              es_extra
       FROM esdeveniments
                LEFT JOIN assajos a ON esdeveniments.id_esdeveniment = a.id_assaig
                LEFT JOIN concerts c ON esdeveniments.id_esdeveniment = c.id_concert
                LEFT JOIN reunions r ON esdeveniments.id_esdeveniment = r.id_reunio
                LEFT JOIN assemblees a2 ON r.id_reunio = a2.id_assemblea;`,
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};

exports.esdeveniments_post = (req, res, next) => {
  const pool = req.app.get("pool");
  const { data_inici, data_final, estat_esdeveniment } = req.body.esdeveniment;

  pool.query(
    `INSERT INTO esdeveniments (dia_inici, hora_inici, dia_final, hora_final, id_estat_esdeveniment)
       VALUES (?, ?, ?, ?, ?);`,
    [data_inici, data_final, estat_esdeveniment || "DEFAULT"],
    (err, rows) => {
      if (err) next(err);
      res.end(rows);
    }
  );
};

exports.esdeveniments_detall_assistents = (req, res, next) => {
  const pool = req.app.get("pool");
  const esdeveniment = req.params.id;

  pool.query(
    `SELECT persones.*
       FROM assistents_esdeveniment
                INNER JOIN persones ON (id_soci = id_persona)
       WHERE id_esdeveniment = ?;`,
    [esdeveniment],
    (err, rows) => {
      if (err) next(err);
      res.send(rows);
    }
  );
};
