SET @id_assaig = ?;

START TRANSACTION;

DELETE
FROM assajos_formacions
WHERE id_assaig = @id_assaig;

DELETE
FROM assajos_projectes
WHERE id_assaig = @id_assaig;

DELETE
FROM assistents_esdeveniment
WHERE id_esdeveniment = @id_assaig;

DELETE
FROM assajos
WHERE id_assaig = @id_assaig;

DELETE
FROM esdeveniments_musicals
WHERE id_esdeveniment_musical = @id_assaig;

DELETE
FROM esdeveniments
WHERE id_esdeveniment = @id_assaig;

COMMIT;
