SELECT EXISTS(
               SELECT *
               FROM roles
                        INNER JOIN roles_usuaris USING (id_role)
               WHERE id_usuari = ?
                 AND role IN (?)
           ) AS es_role;
