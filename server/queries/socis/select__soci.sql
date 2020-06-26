SELECT *,
       (
           SELECT JSON_ARRAYAGG(role)
           FROM roles
                    INNER JOIN roles_usuaris USING (id_role)
           WHERE id_usuari = (SELECT u.id_usuari)
       ) AS roles
FROM socis s
         INNER JOIN persones p ON (id_soci = id_persona)
         LEFT JOIN usuaris u USING (id_persona)
WHERE id_soci = ?;
