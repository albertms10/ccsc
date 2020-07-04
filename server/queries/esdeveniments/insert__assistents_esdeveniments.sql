INSERT INTO assistents_esdeveniment (id_esdeveniment, id_soci, id_estat_confirmacio, retard)
VALUES ?
ON DUPLICATE KEY UPDATE id_estat_confirmacio = VALUES(id_estat_confirmacio),
                        retard               = VALUES(retard);
