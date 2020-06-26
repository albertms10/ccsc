SELECT data_alta,
       data_baixa,
       IFNULL(DATEDIFF(data_baixa, data_alta), DATEDIFF(NOW(), data_alta)) + 1 AS dies_activitat
FROM historial_socis
         INNER JOIN socis s ON historial_socis.id_historial_soci = s.id_soci
WHERE id_soci = ?;
