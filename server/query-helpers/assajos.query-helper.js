exports.assajos_query_helper =
  `a.*,
   IFNULL(CONCAT(dia_inici, ' ', hora_inici), dia_inici) AS data_inici,
   DATE_FORMAT(dia_inici, '%Y-%m-%d')                    AS dia_inici,
   hora_inici,
   IFNULL(CONCAT(IFNULL(dia_final, dia_inici), ' ', hora_final), dia_final) AS data_final,
   IFNULL(DATE_FORMAT(dia_final, '%Y-%m-%d'), dia_inici) AS dia_final,
   hora_final,
   CONCAT(
       'Assaig',
       IF(es_general, ' general', ''),
       IF(es_extra, ' extra', '')
   )                                                     AS titol,
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
                              'id_formacio', id_formacio,
                              'nom', nom,
                              'nom_curt', nom_curt
                          )
                  ), '[]')
       FROM formacions
                INNER JOIN assajos_formacions USING (id_formacio)
       WHERE id_assaig = (SELECT a.id_assaig)
   )                                                     AS formacions,
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
