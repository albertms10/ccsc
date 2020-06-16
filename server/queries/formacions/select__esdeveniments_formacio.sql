SELECT id_esdeveniment,
       IFNULL(CONCAT(dia_inici, ' ', hora_inici), dia_inici) AS data_inici,
       DATE_FORMAT(dia_inici, '%Y-%m-%d')                    AS dia_inici,
       hora_inici,
       IFNULL(CONCAT(dia_final, ' ', hora_final), dia_final) AS data_final,
       IFNULL(DATE_FORMAT(dia_final, '%Y-%m-%d'), dia_inici) AS dia_final,
       hora_final,
       id_estat_esdeveniment,
       id_estat_localitzacio,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)
       )                                                     AS estat_esdeveniment,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)
       )                                                     AS estat_localitzacio,
       (
           SELECT CONCAT_WS(' ', tv.nom, CONCAT(carrer, ','),
                            CONCAT(IFNULL(CONCAT(numero, '–', fins_numero), CONCAT(numero)), ','), c.nom,
                            CONCAT('(',
                                   (SELECT nom FROM ciutats WHERE id_ciutat = (SELECT c.id_provincia)),
                                   ')'))
           FROM localitzacions
                    INNER JOIN tipus_vies tv USING (id_tipus_via)
                    INNER JOIN ciutats c USING (id_ciutat)
           WHERE id_localitzacio = (SELECT esdeveniments.id_localitzacio)
       )                                                     AS localitzacio,
       (
           SELECT e.nom
           FROM localitzacions
                    INNER JOIN establiments e ON localitzacions.id_localitzacio = e.id_establiment
           WHERE id_localitzacio = (SELECT esdeveniments.id_localitzacio)
       )                                                     AS establiment,
       id_esdeveniment_ajornat,
       CONCAT(
               'Assaig',
               IF(es_general, ' general', ''),
               IF(es_extra, ' extra', '')
           )                                                 AS titol,
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
                    INNER JOIN assajos_projectes USING (id_projecte)
           WHERE id_assaig = (SELECT a.id_assaig)
       )                                                     AS projectes,
       'assaig'                                              AS tipus
FROM esdeveniments
         INNER JOIN assajos a ON esdeveniments.id_esdeveniment = a.id_assaig
         INNER JOIN assajos_formacions USING (id_assaig)
WHERE id_formacio = ?

UNION

SELECT id_esdeveniment,
       IFNULL(CONCAT(dia_inici, ' ', hora_inici), dia_inici) AS data_inici,
       DATE_FORMAT(dia_inici, '%Y-%m-%d')                    AS dia_inici,
       hora_inici,
       IFNULL(CONCAT(dia_final, ' ', hora_final), dia_final) AS data_final,
       IFNULL(DATE_FORMAT(dia_final, '%Y-%m-%d'), dia_inici) AS dia_final,
       hora_final,
       id_estat_esdeveniment,
       id_estat_localitzacio,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)
       )                                                     AS estat_esdeveniment,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)
       )                                                     AS estat_localitzacio,
       (
           SELECT CONCAT_WS(' ', tv.nom, CONCAT(carrer, ','),
                            CONCAT(IFNULL(CONCAT(numero, '–', fins_numero), CONCAT(numero)), ','), c.nom,
                            CONCAT('(',
                                   (SELECT nom FROM ciutats WHERE id_ciutat = (SELECT c.id_provincia)),
                                   ')'))
           FROM localitzacions
                    INNER JOIN tipus_vies tv USING (id_tipus_via)
                    INNER JOIN ciutats c USING (id_ciutat)
           WHERE id_localitzacio = (SELECT esdeveniments.id_localitzacio)
       )                                                     AS localitzacio,
       (
           SELECT e.nom
           FROM localitzacions
                    INNER JOIN establiments e ON localitzacions.id_localitzacio = e.id_establiment
           WHERE id_localitzacio = (SELECT esdeveniments.id_localitzacio)
       )                                                     AS establiment,
       id_esdeveniment_ajornat,
       CONCAT('Concert ', titol)                             AS titol,
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
           WHERE id_projecte = (SELECT c.id_projecte)
       )                                                     AS projectes,
       'assaig'                                              AS tipus
FROM esdeveniments
         INNER JOIN concerts c ON esdeveniments.id_esdeveniment = c.id_concert
         INNER JOIN formacions_concerts USING (id_concert)
WHERE id_formacio = ?

UNION

SELECT CONCAT('aniversari-', id_persona)                                   AS id_esdeveniment,
       CAST(CONCAT(?, '-', MONTH(naixement), '-', DAY(naixement)) AS DATE) AS data_inici,
       (SELECT data_inici)                                                 AS dia_inici,
       NULL                                                                AS hora_inici,
       NULL                                                                AS data_final,
       NULL                                                                AS dia_final,
       NULL                                                                AS hora_final,
       NULL                                                                AS id_estat_esdeveniment,
       NULL                                                                AS id_estat_localitzacio,
       NULL                                                                AS estat_esdeveniment,
       NULL                                                                AS estat_localitzacio,
       NULL                                                                AS localitzacio,
       NULL                                                                AS establiment,
       NULL                                                                AS id_esdeveniment_ajornat,
       nom_complet                                                         AS titol,
       NULL                                                                AS projectes,
       'aniversari'                                                        AS tipus
FROM persones
         INNER JOIN socis s ON persones.id_persona = s.id_soci
         INNER JOIN socis_formacions USING (id_soci)
WHERE naixement IS NOT NULL
  AND id_formacio = ?

ORDER BY dia_inici, hora_inici, dia_final, hora_final;
