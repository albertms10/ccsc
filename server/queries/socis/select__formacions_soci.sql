SET @id_soci = ?;

SELECT DISTINCT id_formacio,
                formacions.nom,
                IFNULL(nom_curt, formacions.nom) AS nom_curt,
                descripcio,
                num_persones,
                tipus_formacions.nom AS tipus_formacio
FROM formacions
         INNER JOIN tipus_formacions USING (id_tipus_formacio)
         INNER JOIN formacions_agrupacio USING (id_formacio)
         LEFT JOIN socis_formacions USING (id_formacio)
         LEFT JOIN socis USING (id_soci)
         LEFT JOIN persones p ON socis.id_soci = p.id_persona
         LEFT JOIN usuaris u USING (id_persona)
WHERE socis.id_soci = @id_soci
   OR EXISTS(
        SELECT *
        FROM roles
                 INNER JOIN roles_usuaris USING (id_role)
                 INNER JOIN usuaris USING (id_usuari)
                 INNER JOIN socis ON usuaris.id_persona = socis.id_soci
        WHERE id_soci = @id_soci
          AND role IN (?)
    );
