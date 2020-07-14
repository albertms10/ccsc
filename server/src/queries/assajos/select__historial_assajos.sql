SELECT CONCAT('T', num, ' (', REPLACE(id_curs, '-', '–'), ')') AS x,
       (
           SELECT COUNT(*)
           FROM assajos a
                    INNER JOIN esdeveniments e ON (a.id_assaig = e.id_esdeveniment)
           WHERE e.dia_inici BETWEEN t.data_inici AND IFNULL(t.data_final, NOW())
       )                                                       AS y
FROM trimestres t;
