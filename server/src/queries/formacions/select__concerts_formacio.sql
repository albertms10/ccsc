SELECT id_concert,
       DATE_FORMAT(data, '%Y-%m-%d')               AS data,
       IFNULL(CONCAT(data, ' ', hora_inici), data) AS datahora_inici,
       hora_inici,
       c.titol                                     AS titol_concert,
       id_projecte,
       p.titol                                     AS titol_projecte,
       inicials                                    AS inicials_projecte,
       color                                       AS color_projecte,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = e.id_estat_esdeveniment
       )                                           AS estat_esdeveniment,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = e.id_estat_localitzacio
       )                                           AS estat_localitzacio
FROM esdeveniments e
         INNER JOIN concerts c ON (e.id_esdeveniment = c.id_concert)
         INNER JOIN formacions_concerts USING (id_concert)
         LEFT JOIN projectes p USING (id_projecte)
WHERE id_formacio = ?
ORDER BY data, hora_inici;
