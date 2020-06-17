SELECT id_moviment,
       ordre,
       titol,
       CONCAT(TIME_FORMAT(durada, '%i:%s'), ' min') AS durada
FROM moviments
WHERE id_obra = ?;
