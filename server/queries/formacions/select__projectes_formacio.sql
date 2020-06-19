SELECT *
FROM projectes_full
         INNER JOIN projectes_formacions USING (id_projecte)
WHERE id_formacio = ?;
