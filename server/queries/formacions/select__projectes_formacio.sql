SELECT *
FROM projectes_full
         INNER JOIN projectes_formacions USING (id_projecte)
WHERE id_formacio = ?
ORDER BY data_inici IS NULL, data_inici, data_final IS NULL, data_final, titol;
