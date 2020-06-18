SELECT f.*,
       IF(
               EXISTS(
                       SELECT *
                       FROM assajos_formacions
                       WHERE id_assaig = ?
                         AND id_formacio = (SELECT f.id_formacio)
                   ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)
           ) AS convocada
FROM formacions_agrupacio
         INNER JOIN formacions f USING (id_formacio)
WHERE id_agrupacio = 1;
