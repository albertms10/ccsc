SELECT data_alta,
       data_baixa,
       IFNULL(DATEDIFF(data_baixa, data_alta), DATEDIFF(NOW(), data_alta)) + 1 AS dies_activitat
FROM historial_socis hs
         INNER JOIN socis s ON (hs.id_historial_soci = s.id_soci)
WHERE id_soci = ?;
