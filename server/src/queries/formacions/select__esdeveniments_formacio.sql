SET @id_formacio = ?;

SELECT ae.id_esdeveniment,
       ae.data,
       ae.datahora_inici,
       ae.hora_inici,
       ae.datahora_final,
       ae.hora_final,
       ae.id_estat_esdeveniment,
       ae.id_estat_localitzacio,
       ae.estat_esdeveniment,
       ae.estat_localitzacio/*,
       ae.localitzacio*/,
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
       ee.data,
       ee.datahora_inici,
       ee.hora_inici,
       ee.datahora_final,
       ee.hora_final,
       ee.id_estat_esdeveniment,
       ee.id_estat_localitzacio,
       ee.estat_esdeveniment,
       ee.estat_localitzacio/*,
       ee.localitzacio*/,
       ee.establiment,
       ee.id_esdeveniment_ajornat,
       CONCAT('Concert ', titol) AS titol,
       (
           SELECT CAST(IFNULL(JSON_ARRAYAGG(
                                      JSON_OBJECT(
                                              'id_projecte', id_projecte,
                                              'titol', titol,
                                              'inicials', inicials,
                                              'color', color
                                          )
                                  ), '[]') AS JSON)
           FROM projectes
           WHERE id_projecte = c.id_projecte
       )                         AS projectes,
       'concert'                 AS tipus
FROM esdeveniments_estat ee
         INNER JOIN concerts c ON (ee.id_esdeveniment = c.id_concert)
         INNER JOIN formacions_concerts USING (id_concert)
WHERE id_formacio = @id_formacio

ORDER BY data, hora_inici, hora_final;
