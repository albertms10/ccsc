SELECT id_localitzacio,
       tv.*,
       carrer,
       IFNULL(CONCAT(numero, '–', fins_numero), numero) AS numero,
       codi_postal,
       gmaps,
       c.id_ciutat,
       c.nom                                            AS ciutat,
       c.id_provincia,
       (
           SELECT nom
           FROM ciutats
           WHERE id_ciutat = (SELECT c.id_provincia)
       )                                                AS provincia,
       p2.id_pais,
       p2.nom                                           AS pais
FROM localitzacions
         LEFT JOIN tipus_vies tv USING (id_tipus_via)
         LEFT JOIN ciutats c USING (id_ciutat)
         LEFT JOIN provincies p ON (IFNULL(c.id_provincia, c.id_ciutat) = p.id_provincia)
         LEFT JOIN paisos p2 USING (id_pais)
WHERE id_localitzacio = ?;
