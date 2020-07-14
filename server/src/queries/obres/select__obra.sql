SELECT o.*, SEC_TO_TIME(SUM(TIME_TO_SEC(durada))) AS durada_total
FROM obres o
         LEFT JOIN moviments USING (id_obra)
WHERE id_obra = ?;
