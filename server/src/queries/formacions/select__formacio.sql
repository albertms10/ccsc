SELECT id_formacio,
       nom,
       IFNULL(nom_curt, nom) AS nom_curt,
       descripcio,
       num_persones
FROM formacions
WHERE id_formacio = ?;
