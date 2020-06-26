SELECT id_persona,
       nom,
       cognoms,
       nom_complet,
       username,
       email,
       telefon,
       IF(
               EXISTS(
                       SELECT *
                       FROM socis s
                                INNER JOIN historial_socis hs ON (s.id_soci = hs.id_historial_soci)
                       WHERE id_soci = p.id_persona
                         AND CURRENT_DATE
                           BETWEEN data_alta
                           AND IFNULL(DATE_SUB(data_baixa, INTERVAL 1 DAY), CURRENT_DATE)
                       ORDER BY data_alta DESC
                   ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)
           ) AS estat_actiu,
       (
           SELECT MAX(data_alta)
           FROM historial_socis
           WHERE id_historial_soci = p.id_persona
           ORDER BY data_alta DESC
           LIMIT 1
       )     AS data_actiu,
       (
           SELECT MAX(data_baixa)
           FROM historial_socis
           WHERE id_historial_soci = p.id_persona
           ORDER BY data_alta DESC
           LIMIT 1
       )     AS data_inactiu,
       (
           SELECT IFNULL(DATEDIFF(data_baixa, data_alta), DATEDIFF(NOW(), data_alta)) + 1
           FROM historial_socis
           WHERE id_historial_soci = p.id_persona
           ORDER BY data_alta DESC
           LIMIT 1
       )     AS dies_activitat,
       (
           SELECT DATEDIFF(NOW(), data_baixa) + 1
           FROM historial_socis
           WHERE id_historial_soci = p.id_persona
           ORDER BY data_alta DESC
           LIMIT 1
       )     AS dies_inactivitat
FROM socis s
         INNER JOIN persones p ON (s.id_soci = p.id_persona)
         LEFT JOIN usuaris USING (id_persona)
ORDER BY estat_actiu DESC, cognoms, nom;
