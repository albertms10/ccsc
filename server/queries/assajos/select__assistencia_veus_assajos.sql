SELECT CONCAT(
               DATE_FORMAT(dia_inici, '%d/%m/%Y'),
               IFNULL(CONCAT(' ', TIME_FORMAT(hora_inici, '%H:%i')), '')
           )                                                 AS assaig,
       COUNT(id_soci)                                     AS convocats,
       COUNT(CASE WHEN id_veu IN (1, 2) THEN id_soci END) AS sopranos,
       COUNT(CASE WHEN id_veu IN (3) THEN id_soci END)    AS contralts,
       COUNT(CASE WHEN id_veu IN (4) THEN id_soci END)    AS tenors,
       COUNT(CASE WHEN id_veu IN (5, 6) THEN id_soci END) AS baixos
FROM (
         SELECT id_assaig,
                dia_inici,
                hora_inici,
                sv.*
         FROM assajos a
                  INNER JOIN esdeveniments e ON (id_esdeveniment = id_assaig)
                  LEFT JOIN assistents_esdeveniment ae2 USING (id_esdeveniment)
                  LEFT JOIN socis_veus sv USING (id_soci)
         WHERE sv.id_soci IN (
             SELECT id_soci
             FROM socis
                      INNER JOIN socis_formacions USING (id_soci)
                      INNER JOIN assajos_formacions USING (id_formacio)
             WHERE id_assaig = a.id_assaig
         )
     ) ae
WHERE NOT EXISTS(
        (
            SELECT *
            FROM assajos
                     INNER JOIN veus_convocades_assaig USING (id_assaig)
            WHERE id_assaig = ae.id_assaig
        )
    )
   OR ae.id_veu IN
      (
          SELECT DISTINCT id_veu
          FROM assajos
                   INNER JOIN veus_convocades_assaig USING (id_assaig)
          WHERE id_assaig = ae.id_assaig
      )
GROUP BY id_assaig, dia_inici, hora_inici
ORDER BY dia_inici, hora_inici;
