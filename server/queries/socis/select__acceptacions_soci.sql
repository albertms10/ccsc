SELECT IFNULL(
               JSON_OBJECTAGG(form_name, IF(accepta, CAST(TRUE AS JSON), CAST(FALSE AS JSON))),
               '{}'
           ) AS acceptacions
FROM socis_acceptacions
         INNER JOIN acceptacions_avis USING (id_acceptacio_avis)
WHERE id_soci = ?;
