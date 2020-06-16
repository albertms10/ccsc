SELECT id_ciutat,
       ciutats.nom                             AS ciutat,
       IFNULL(ciutats.id_provincia, id_ciutat) AS id_provincia,
       (
           SELECT nom
           FROM ciutats
           WHERE id_ciutat = (SELECT p.id_provincia)
       )                                       AS provincia,
       p2.id_pais,
       p2.nom                                  AS pais
FROM ciutats
         LEFT JOIN provincies p ON IFNULL(ciutats.id_provincia, ciutats.id_ciutat) = p.id_provincia
         LEFT JOIN paisos p2 USING (id_pais);
