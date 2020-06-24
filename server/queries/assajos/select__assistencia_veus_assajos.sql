SELECT CONCAT(
               DATE_FORMAT(dia_inici, '%d/%m/%Y'),
               IFNULL(CONCAT(' ', TIME_FORMAT(hora_inici, '%H:%i')), '')
           )                                              AS assaig,
       COUNT(id_soci)                                     AS convocats,
       COUNT(CASE WHEN id_veu IN (1, 2) THEN id_soci END) AS sopranos,
       COUNT(CASE WHEN id_veu IN (3) THEN id_soci END)    AS contralts,
       COUNT(CASE WHEN id_veu IN (4) THEN id_soci END)    AS tenors,
       COUNT(CASE WHEN id_veu IN (5, 6) THEN id_soci END) AS baixos
FROM socis_convocats_assajos
         INNER JOIN esdeveniments ON (id_esdeveniment = id_assaig)
WHERE NOT es_parcial
GROUP BY id_assaig, dia_inici, hora_inici
ORDER BY dia_inici, hora_inici;
