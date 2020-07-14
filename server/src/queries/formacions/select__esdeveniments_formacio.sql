SET @id_formacio = ?;

SELECT ae.id_esdeveniment,
       ae.data_inici,
       ae.dia_inici,
       ae.hora_inici,
       ae.data_final,
       ae.dia_final,
       ae.hora_final,
       ae.id_estat_esdeveniment,
       ae.id_estat_localitzacio,
       ae.estat_esdeveniment,
       ae.estat_localitzacio,
       ae.localitzacio,
       ae.establiment,
       ae.id_esdeveniment_ajornat,
       ae.titol,
       ae.projectes,
       'assaig' AS tipus
FROM assajos_estat ae
         INNER JOIN assajos_formacions USING (id_assaig)
WHERE id_formacio = @id_formacio

UNION

SELECT ee.id_esdeveniment,
       ee.data_inici,
       ee.dia_inici,
       ee.hora_inici,
       ee.data_final,
       ee.dia_final,
       ee.hora_final,
       ee.id_estat_esdeveniment,
       ee.id_estat_localitzacio,
       ee.estat_esdeveniment,
       ee.estat_localitzacio,
       ee.localitzacio,
       ee.establiment,
       ee.id_esdeveniment_ajornat,
       CONCAT('Concert ', titol) AS titol,
       (
           SELECT JSON_ARRAYAGG(
                          JSON_OBJECT(
                                  'id_projecte', id_projecte,
                                  'titol', titol,
                                  'inicials', inicials,
                                  'color', color
                              )
                      )
           FROM projectes
           WHERE id_projecte = c.id_projecte
       )                         AS projectes,
       'concert'                 AS tipus
FROM esdeveniments_estat ee
         INNER JOIN concerts c ON (ee.id_esdeveniment = c.id_concert)
         INNER JOIN formacions_concerts USING (id_concert)
WHERE id_formacio = @id_formacio

UNION

SELECT CONCAT('aniversari-', id_persona) AS id_esdeveniment,
       CAST(
               CONCAT(YEAR(NOW()), '-', MONTH(naixement), '-', DAY(naixement))
           AS DATE)                      AS data_inici,
       (SELECT data_inici)               AS dia_inici,
       NULL                              AS hora_inici,
       NULL                              AS data_final,
       NULL                              AS dia_final,
       NULL                              AS hora_final,
       NULL                              AS id_estat_esdeveniment,
       NULL                              AS id_estat_localitzacio,
       NULL                              AS estat_esdeveniment,
       NULL                              AS estat_localitzacio,
       NULL                              AS localitzacio,
       NULL                              AS establiment,
       NULL                              AS id_esdeveniment_ajornat,
       nom_complet                       AS titol,
       NULL                              AS projectes,
       'aniversari'                      AS tipus
FROM persones p
         INNER JOIN socis s ON (p.id_persona = s.id_soci)
         INNER JOIN socis_formacions USING (id_soci)
WHERE naixement IS NOT NULL
  AND id_formacio = @id_formacio

ORDER BY dia_inici, hora_inici, dia_final, hora_final;
