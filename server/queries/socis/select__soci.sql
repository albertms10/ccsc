SELECT persones.*, usuaris.*, socis.*
FROM socis
         INNER JOIN persones ON (id_soci = id_persona)
         LEFT JOIN usuaris USING (id_persona)
WHERE ?;
