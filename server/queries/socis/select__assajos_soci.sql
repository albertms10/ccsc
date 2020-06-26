SET @id_soci = ?;

SELECT DISTINCT ae.*
FROM assajos_estat ae
         LEFT JOIN assajos_projectes USING (id_assaig)
         LEFT JOIN assajos_formacions af USING (id_assaig)
         LEFT JOIN projectes_formacions USING (id_projecte)
         LEFT JOIN socis_formacions sa ON (af.id_formacio = sa.id_formacio)
         LEFT JOIN usuaris ON (sa.id_soci = id_persona)
WHERE EXISTS(
        SELECT *
        FROM veus_convocades_assaig
                 INNER JOIN socis_formacions_veus USING (id_veu)
                 INNER JOIN socis_formacions USING (id_soci_formacio)
        WHERE id_soci = @id_soci
          AND id_assaig = ae.id_assaig
    )
   OR EXISTS(
        SELECT *
        FROM roles
                 INNER JOIN roles_usuaris USING (id_role)
                 INNER JOIN usuaris u USING (id_usuari)
                 INNER JOIN socis ON (id_soci = u.id_persona)
        WHERE id_soci = @id_soci
          AND role IN (?)
    )
ORDER BY dia_inici, hora_inici;
