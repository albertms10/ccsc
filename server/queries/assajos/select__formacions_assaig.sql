SELECT id_formacio,
       nom,
       IFNULL(nom_curt, nom) AS nom_curt,
       IF(
               EXISTS(
                       SELECT *
                       FROM assajos_formacions
                       WHERE id_assaig = ?
                         AND id_formacio = f.id_formacio
                   ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)
           )                 AS convocada
FROM formacions f;
