INSERT INTO socis_acceptacions (id_soci, id_acceptacio_avis, accepta)
VALUES ?
ON DUPLICATE KEY UPDATE accepta = VALUES(accepta);
