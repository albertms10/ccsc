exports.assajos_query_helper =
  `a.*,
   IFNULL(CONCAT(dia_inici, ' ', hora_inici), dia_inici) AS data_inici,
   DATE_FORMAT(dia_inici, '%Y-%m-%d')                    AS dia_inici,
   hora_inici,
   IFNULL(CONCAT(dia_final, ' ', hora_final), dia_final) AS data_final,
   IFNULL(DATE_FORMAT(dia_final, '%Y-%m-%d'), dia_inici) AS dia_final,
   hora_final,
   (
       SELECT estat
       FROM estats_confirmacio
       WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)
   )                                                     AS estat_esdeveniment,
   (
       SELECT estat
       FROM estats_confirmacio
       WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)
   )                                                     AS estat_localitzacio,
   (
       SELECT IFNULL(JSON_ARRAYAGG(
                      JSON_OBJECT(
                              'id_agrupacio', id_agrupacio,
                              'nom', nom,
                              'nom_curt', nom_curt
                          )
                  ), '[]')
       FROM agrupacions
                INNER JOIN assajos_agrupacions USING (id_agrupacio)
       WHERE id_assaig = (SELECT a.id_assaig)
   )                                                     AS agrupacions,
   (
       SELECT IFNULL(JSON_ARRAYAGG(
                      JSON_OBJECT(
                              'id_projecte', id_projecte,
                              'titol', titol,
                              'inicials', inicials,
                              'color', color
                          )
                  ), '[]')
       FROM projectes
                INNER JOIN assajos_projectes USING (id_projecte)
       WHERE id_assaig = (SELECT a.id_assaig)
   )                                                     AS projectes`;
