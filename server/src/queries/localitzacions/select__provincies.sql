SELECT p.id_provincia, c.nom, p.*
FROM provincies p
         INNER JOIN ciutats c ON (p.id_provincia = c.id_ciutat)
         LEFT JOIN paisos p USING (id_pais);
