SELECT id_assaig,
       CONCAT(dia_inici)                                          AS dia_inici,
       hora_inici,
       COUNT(id_soci)                                             AS convocats,
       COUNT(CASE WHEN retard THEN id_soci END)                   AS confirmats_retard,
       COUNT(
               CASE WHEN id_estat_confirmacio = 1 AND NOT retard THEN id_soci END
           )                                                      AS confirmats_puntuals,
       COUNT(CASE WHEN id_estat_confirmacio = 2 THEN id_soci END) AS pendents,
       COUNT(CASE WHEN id_estat_confirmacio = 3 THEN id_soci END) AS cancelats
FROM socis_convocats_assajos
         INNER JOIN esdeveniments ON (id_esdeveniment = id_assaig)
WHERE NOT es_parcial
GROUP BY id_assaig, dia_inici, hora_inici
ORDER BY dia_inici, hora_inici;
