SELECT id_ciutat,
       c.nom                             AS ciutat,
       IFNULL(c.id_provincia, id_ciutat) AS id_provincia,
       (
           SELECT nom
           FROM ciutats
           WHERE id_ciutat = (SELECT p.id_provincia)
       )                                 AS provincia,
       p2.id_pais,
       p2.nom                            AS pais
FROM ciutats c
         LEFT JOIN provincies p ON (IFNULL(c.id_provincia, c.id_ciutat) = p.id_provincia)
         LEFT JOIN paisos p2 USING (id_pais);
