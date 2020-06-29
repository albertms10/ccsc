SET @id_projecte = ?;

START TRANSACTION;

DELETE
FROM assajos_projectes
WHERE id_projecte = @id_projecte;

DELETE
FROM moviments_projectes
WHERE id_projecte = @id_projecte;

DELETE
FROM directors_projectes
WHERE id_projecte = @id_projecte;

DELETE
FROM projectes_formacions
WHERE id_projecte = @id_projecte;

DELETE
FROM socis_projectes_veu
WHERE id_projecte = @id_projecte;

DELETE
FROM socis_veu_moviment_projectes
WHERE id_projecte = @id_projecte;

DELETE
FROM projectes
WHERE id_projecte = @id_projecte;

COMMIT;
