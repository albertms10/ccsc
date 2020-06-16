SET @id_formacio = ?;

SELECT projectes.id_projecte,
       titol,
       descripcio,
       inicials,
       color,
       id_curs,
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
       ) AS directors,
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
             AND formacions.id_formacio <> @id_formacio
       ) AS formacions
FROM projectes
         INNER JOIN projectes_formacions USING (id_projecte)
WHERE id_formacio = @id_formacio;
