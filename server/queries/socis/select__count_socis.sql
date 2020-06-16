SELECT (
           SELECT COUNT(id_soci)
           FROM socis
                    INNER JOIN persones ON socis.id_soci = persones.id_persona
                    INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
           WHERE CURRENT_DATE BETWEEN data_alta AND IFNULL(data_baixa, CURRENT_DATE)
       ) AS count_actuals,
       (
           SELECT COUNT(id_soci)
           FROM socis
                    INNER JOIN persones ON socis.id_soci = persones.id_persona
                    INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
           WHERE data_alta BETWEEN (CURRENT_DATE - INTERVAL 3 MONTH) AND CURRENT_DATE
       ) AS count_altes,
       (
           SELECT COUNT(id_soci)
           FROM socis
                    INNER JOIN persones ON socis.id_soci = persones.id_persona
                    INNER JOIN historial_socis hs ON socis.id_soci = hs.id_historial_soci
           WHERE data_baixa BETWEEN (CURRENT_DATE - INTERVAL 3 MONTH) AND CURRENT_DATE
       ) AS count_baixes;
