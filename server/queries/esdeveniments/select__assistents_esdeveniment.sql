SELECT persones.*
FROM assistents_esdeveniment
         INNER JOIN persones ON (id_soci = id_persona)
WHERE ?;
