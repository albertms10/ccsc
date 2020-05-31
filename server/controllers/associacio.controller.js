const { parseAndSendJSON } = require("../helpers");
exports.associacio_get = (req, res, next) => {
  const pool = req.app.get("pool");

  pool
    .query(
        `SELECT *
         FROM associacio;`
    )
    .then(([associacio]) => res.json(associacio))
    .catch((e) => next(e));
};

exports.associacio_avisos_detall = (req, res, next) => {
  const pool = req.app.get("pool");
  const unique_name = req.params.id;

  pool
    .query(
        `SELECT tipus_avisos.nom AS titol,
                avisos.descripcio,
                titol_acceptacions,
                requerit,
                data_inici,
                data_final,
                (
                    SELECT IFNULL(JSON_ARRAYAGG(
                                          JSON_OBJECT(
                                                  'id', id_seccio_avis,
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
                                                  'descripcio', descripcio,
                                                  'requerida', IF(requerida, CAST(TRUE AS JSON), CAST(FALSE AS JSON)),
                                                  'form_name', form_name
                                              )
                                      ), '[]')
                    FROM acceptacions_avis
                    WHERE id_avis = (SELECT avisos.id_avis)
                )                AS acceptacions
         FROM avisos
                  INNER JOIN tipus_avisos USING (id_tipus_avis)
         WHERE ?
           AND IFNULL(CURRENT_DATE >= data_inici, TRUE)
           AND IFNULL(CURRENT_DATE < data_final, TRUE)
         LIMIT 1;`,
      { unique_name }
    )
    .then(([avis]) =>
      parseAndSendJSON(res, next, avis, ["seccions", "acceptacions"])
    )
    .catch((e) => next(e));
};
