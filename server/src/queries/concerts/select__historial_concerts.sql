SELECT REPLACE(id_curs, '-', '–') AS x,
       (
           SELECT COUNT(*)
           FROM concerts c1
                    INNER JOIN esdeveniments e ON (c1.id_concert = e.id_esdeveniment)
           WHERE e.dia_inici BETWEEN c2.inici AND IFNULL(c2.final, NOW())
       )                          AS y
FROM cursos c2;
