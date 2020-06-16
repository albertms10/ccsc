SET @id_soci = ?;

SELECT DISTINCT projectes.id_projecte,
                titol,
                descripcio,
                inicials,
                color,
                data_inici,
                data_final,
                id_curs,
                YEAR(cursos.inici) AS any_inici_curs,
                YEAR(cursos.final) AS any_final_curs,
                (
                    SELECT IFNULL(JSON_ARRAYAGG(
                                          JSON_OBJECT(
                                                  'id_director', id_director,
                                                  'nom', nom_complet
                                              )
                                      ), '[]')
                    FROM directors_projectes
                             INNER JOIN persones p ON directors_projectes.id_director = p.id_persona
                    WHERE id_projecte = (SELECT projectes.id_projecte)
                )                  AS directors,
                (
                    SELECT IFNULL(JSON_ARRAYAGG(
                                          JSON_OBJECT(
                                                  'id_formacio', formacions.id_formacio,
                                                  'nom', nom,
                                                  'nom_curt', nom_curt
                                              )
                                      ), '[]')
                    FROM projectes_formacions
                             INNER JOIN formacions USING (id_formacio)
                    WHERE id_projecte = (SELECT projectes.id_projecte)
                )                  AS formacions
FROM projectes
         INNER JOIN projectes_formacions USING (id_projecte)
         INNER JOIN socis_formacions USING (id_formacio)
         INNER JOIN cursos USING (id_curs)
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
