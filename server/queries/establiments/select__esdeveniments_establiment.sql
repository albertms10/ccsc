SELECT *
FROM establiments
         INNER JOIN localitzacions l ON establiments.id_establiment = l.id_localitzacio
         INNER JOIN esdeveniments USING (id_localitzacio)
WHERE ?;
