SELECT id_concert,
       IFNULL(CONCAT(dia_inici, ' ', hora_inici), dia_inici) AS data_inici,
       DATE_FORMAT(dia_inici, '%Y-%m-%d')                    AS dia_inici,
       hora_inici,
       c.titol                                               AS titol_concert,
       id_projecte,
       p.titol                                               AS titol_projecte,
       inicials                                              AS inicials_projecte,
       color                                                 AS color_projecte,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)
       )                                                     AS estat_esdeveniment,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)
       )                                                     AS estat_localitzacio
FROM esdeveniments
         INNER JOIN concerts c ON esdeveniments.id_esdeveniment = c.id_concert
         INNER JOIN formacions_concerts USING (id_concert)
         LEFT JOIN projectes p USING (id_projecte)
WHERE ?
ORDER BY dia_inici, hora_inici;
