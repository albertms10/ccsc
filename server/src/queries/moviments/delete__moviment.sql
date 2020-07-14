SET @id_moviment = ?;

START TRANSACTION;

DELETE
FROM moviments_projectes
WHERE id_moviment = @id_moviment;

DELETE
FROM moviments_esdeveniment_musical
WHERE id_moviment = @id_moviment;

DELETE svmp
FROM socis_veu_moviment_projectes svmp
         INNER JOIN veus_moviments vm USING (id_veu_moviment)
WHERE id_moviment = @id_moviment;

DELETE
FROM veus_moviments
WHERE id_moviment = @id_moviment;

DELETE
FROM moviments
WHERE id_moviment = @id_moviment;

COMMIT;
