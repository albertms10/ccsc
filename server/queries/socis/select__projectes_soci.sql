SET @id_soci = ?;

SELECT DISTINCT pf.*
FROM projectes_full pf
         INNER JOIN projectes_formacions USING (id_projecte)
         INNER JOIN socis_formacions USING (id_formacio)
WHERE id_soci = @id_soci
   OR EXISTS(
        SELECT *
        FROM roles
                 INNER JOIN roles_usuaris USING (id_role)
                 INNER JOIN usuaris USING (id_usuari)
                 INNER JOIN socis ON usuaris.id_persona = socis.id_soci
        WHERE id_soci = @id_soci
          AND role IN (?)
    );
