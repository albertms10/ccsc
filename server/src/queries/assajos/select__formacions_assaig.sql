SELECT id_formacio,
       nom,
       IFNULL(nom_curt, nom) AS nom_curt,
       EXISTS(
               SELECT *
               FROM assajos_formacions
               WHERE id_assaig = ?
                 AND id_formacio = f.id_formacio
           )                 AS convocada
FROM formacions f;
