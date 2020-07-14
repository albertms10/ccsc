SELECT id_usuari
FROM usuaris u
         INNER JOIN socis s ON (u.id_persona = s.id_soci)
WHERE id_soci = ?;
