SELECT IFNULL(
               JSON_OBJECTAGG(form_name, accepta),
               '{}'
           ) AS acceptacions
FROM socis_acceptacions
         INNER JOIN acceptacions_avis USING (id_acceptacio_avis)
WHERE id_soci = ?;
