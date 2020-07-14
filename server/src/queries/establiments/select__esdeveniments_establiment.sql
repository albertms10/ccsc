SELECT *
FROM establiments e
         INNER JOIN localitzacions l ON (e.id_establiment = l.id_localitzacio)
         INNER JOIN esdeveniments USING (id_localitzacio)
WHERE id_establiment = ?;
