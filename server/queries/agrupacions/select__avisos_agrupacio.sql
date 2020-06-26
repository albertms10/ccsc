SELECT tipus_avisos.nom AS titol,
       a.descripcio,
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
           WHERE id_avis = a.id_avis
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
           WHERE id_avis = a.id_avis
       )                AS acceptacions
FROM avisos a
         INNER JOIN tipus_avisos USING (id_tipus_avis)
WHERE unique_name = ?
  AND IFNULL(CURRENT_DATE >= data_inici, TRUE)
  AND IFNULL(CURRENT_DATE < data_final, TRUE)
LIMIT 1;
