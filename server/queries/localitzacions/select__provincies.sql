SELECT provincies.id_provincia, c.nom, p.*
FROM provincies
         INNER JOIN ciutats c ON provincies.id_provincia = c.id_ciutat
         LEFT JOIN paisos p USING (id_pais);
