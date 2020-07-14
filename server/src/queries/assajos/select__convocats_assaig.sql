SELECT *
FROM socis_convocats_assajos
WHERE id_assaig = ?
ORDER BY id_assaig, id_veu, cognoms, nom;
