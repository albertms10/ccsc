SELECT CONCAT('T', num, ' (', REPLACE(id_curs, '-', '–'), ')') AS x, COUNT(*) AS y
FROM socis
         INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
         CROSS JOIN cursos
         INNER JOIN trimestres t USING (id_curs)
WHERE hs.data_alta <= IFNULL(t.data_final, NOW())
GROUP BY id_trimestre, t.data_inici
ORDER BY t.data_inici;
