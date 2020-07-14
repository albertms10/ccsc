SET @id_persona = ?;

START TRANSACTION;

DELETE ru
FROM roles_usuaris ru
         INNER JOIN usuaris USING (id_usuari)
WHERE id_persona = @id_persona;

DELETE
FROM usuaris_complet
WHERE id_persona = @id_persona;

DELETE
FROM historial_socis
WHERE id_historial_soci = @id_persona;

DELETE
FROM socis_acceptacions
WHERE id_soci = @id_persona;

DELETE
FROM socis_activitats
WHERE id_soci = @id_persona;

DELETE sav
FROM socis_formacions_veus sav
         INNER JOIN socis_formacions USING (id_soci_formacio)
WHERE id_soci = @id_persona;

DELETE
FROM socis_formacions
WHERE id_soci = @id_persona;

DELETE
FROM socis
WHERE id_soci = @id_persona;

DELETE
FROM persones
WHERE id_persona = @id_persona;

COMMIT;
