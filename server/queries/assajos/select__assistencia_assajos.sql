SELECT CONCAT(
               DATE_FORMAT(dia_inici, '%d/%m/%Y'),
               IFNULL(CONCAT(' ', TIME_FORMAT(hora_inici, '%H:%i')), '')
           )                                                      AS assaig,
       COUNT(id_soci)                                             AS convocats,
       COUNT(CASE WHEN retard THEN id_soci END)                   AS confirmats_retard,
       COUNT(
               CASE WHEN id_estat_confirmacio = 1 AND NOT retard THEN id_soci END
           )                                                      AS confirmats_puntuals,
       COUNT(CASE WHEN id_estat_confirmacio = 2 THEN id_soci END) AS pendents,
       COUNT(CASE WHEN id_estat_confirmacio = 3 THEN id_soci END) AS cancelats
FROM (
         SELECT id_assaig,
                dia_inici,
                hora_inici,
                IFNULL(id_estat_confirmacio, 1) AS id_estat_confirmacio,
                IFNULL(retard, FALSE)           AS retard,
                sv.*
         FROM assajos a
                  INNER JOIN esdeveniments e ON (id_esdeveniment = id_assaig)
                  LEFT JOIN assistents_esdeveniment ae2 USING (id_esdeveniment)
                  LEFT JOIN socis_veus sv USING (id_soci)
     ) ae
WHERE ((
               NOT EXISTS(
                       (
                           SELECT *
                           FROM assajos
                                    INNER JOIN veus_convocades_assaig USING (id_assaig)
                           WHERE id_assaig = ae.id_assaig
                       )
                   )
               AND EXISTS(
                       (
                           SELECT *
                           FROM assajos
                                    INNER JOIN assajos_formacions USING (id_assaig)
                                    INNER JOIN socis_formacions USING (id_formacio)
                           WHERE id_assaig = ae.id_assaig
                             AND id_soci = ae.id_soci
                       )
                   )
           )
    OR ae.id_veu IN
       (
           SELECT DISTINCT id_veu
           FROM assajos
                    INNER JOIN veus_convocades_assaig USING (id_assaig)
           WHERE id_assaig = ae.id_assaig
       )
          )
GROUP BY id_assaig, dia_inici, hora_inici
ORDER BY dia_inici, hora_inici;
