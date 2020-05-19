exports.associacio_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT *
       FROM associacio;`,
    (err, [associacio]) => {
      if (err) next(err);
      res.send(associacio);
    }
  );
};

exports.associacio_protecciodades = (req, res, next) => {
  const pool = req.app.get("pool");

  pool.query(
    `SELECT tipus_avisos.nom AS titol,
              avisos.descripcio,
              titol_acceptacions,
              requerit,
              data_inici,
              data_final,
              (
                  SELECT IFNULL(JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                                'titol', titol,
                                                'descripcio', descripcio
                                            )
                                    ), '[]')
                  FROM seccions_avis
                  WHERE id_avis = (SELECT avisos.id_avis)
              )                AS seccions,
              (
                  SELECT IFNULL(JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                                'titol', titol,
                                                'descripcio', descripcio
                                            )
                                    ), '[]')
                  FROM acceptacions_avis
                  WHERE id_avis = (SELECT avisos.id_avis)
              )                AS acceptacions
       FROM avisos
                INNER JOIN tipus_avisos USING (id_tipus_avis)
       WHERE id_tipus_avis = 1
         AND IFNULL(CURRENT_DATE >= data_inici, TRUE)
         AND IFNULL(CURRENT_DATE < data_final, TRUE)
       LIMIT 1;`,
    (err, [proteccioDades]) => {
      if (err) next(err);
      res.send(proteccioDades);
    }
  );
};
