SELECT REPLACE(id_curs, '-', '–') AS x, COUNT(*) AS y
FROM projectes
         INNER JOIN cursos USING (id_curs)
GROUP BY id_curs, cursos.inici
ORDER BY cursos.inici;
