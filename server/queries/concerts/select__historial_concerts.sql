SELECT REPLACE(id_curs, '-', '–') AS x,
       (
           SELECT COUNT(*)
           FROM concerts
                    INNER JOIN esdeveniments e ON concerts.id_concert = e.id_esdeveniment
           WHERE e.dia_inici BETWEEN (SELECT c.inici) AND IFNULL((SELECT c.final), NOW())
       )                          AS y
FROM cursos c;
