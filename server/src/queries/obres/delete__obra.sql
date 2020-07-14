SET @id_obra = ?;

START TRANSACTION;

DELETE svmp
FROM socis_veu_moviment_projectes svmp
         INNER JOIN veus_moviments USING (id_veu_moviment)
         INNER JOIN moviments USING (id_moviment)
WHERE id_obra = @id_obra;

DELETE vm
FROM veus_moviments vm
         INNER JOIN moviments USING (id_moviment)
WHERE id_obra = @id_obra;

DELETE
FROM moviments
WHERE id_obra = @id_obra;

DELETE
FROM obres
WHERE id_obra = @id_obra;

COMMIT;
