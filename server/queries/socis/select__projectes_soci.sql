SET @id_soci = ?;

SELECT DISTINCT pf.*
FROM projectes_full pf
         LEFT JOIN projectes_formacions USING (id_projecte)
         LEFT JOIN socis_formacions USING (id_formacio)
WHERE id_soci = @id_soci
   OR EXISTS(
        SELECT *
        FROM roles
                 INNER JOIN roles_usuaris USING (id_role)
                 INNER JOIN usuaris u USING (id_usuari)
                 INNER JOIN socis s ON (u.id_persona = s.id_soci)
        WHERE id_soci = @id_soci
          AND role IN (?)
    )
ORDER BY data_inici IS NULL, data_inici, data_final IS NULL, data_final, titol;
