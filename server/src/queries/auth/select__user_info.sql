SELECT id_usuari AS id,
       username,
       nom,
       cognoms,
       es_dona,
       id_persona,
       (
           SELECT JSON_ARRAYAGG(role)
           FROM roles_usuaris
                    INNER JOIN roles USING (id_role)
           WHERE id_usuari = u.id_usuari
       )         AS roles,
       (
           SELECT IFNULL(JSON_ARRAYAGG(unique_name), '[]')
           FROM avisos
                    INNER JOIN tipus_avisos USING (id_tipus_avis)
                    INNER JOIN acceptacions_avis av USING (id_avis)
           WHERE requerida IS TRUE
             AND NOT EXISTS(
                   SELECT *
                   FROM socis_acceptacions
                   WHERE id_acceptacio_avis = av.id_acceptacio_avis
                     AND accepta IS TRUE
                     AND id_soci = p.id_persona
               )
       )         AS avisos,
       EXISTS(
               SELECT *
               FROM socis s
                        INNER JOIN historial_socis hs ON (s.id_soci = hs.id_historial_soci)
               WHERE id_soci = p.id_persona
                 AND CURRENT_DATE
                   BETWEEN data_alta
                   AND IFNULL(DATE_SUB(data_baixa, INTERVAL 1 DAY), CURRENT_DATE)
               ORDER BY data_alta DESC
           )     AS es_actiu
FROM usuaris u
         LEFT JOIN persones p USING (id_persona)
WHERE ?;
