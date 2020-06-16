SET @id_soci = ?;

SELECT a.*,
       IFNULL(CONCAT(dia_inici, ' ', hora_inici), dia_inici)                    AS data_inici,
       DATE_FORMAT(dia_inici, '%Y-%m-%d')                                       AS dia_inici,
       hora_inici,
       IFNULL(CONCAT(IFNULL(dia_final, dia_inici), ' ', hora_final), dia_final) AS data_final,
       IFNULL(DATE_FORMAT(dia_final, '%Y-%m-%d'), dia_inici)                    AS dia_final,
       hora_final,
       CONCAT(
               'Assaig',
               IF(es_general, ' general', ''),
               IF(es_extra, ' extra', '')
           )                                                                    AS titol,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT id_estat_esdeveniment)
       )                                                                        AS estat_esdeveniment,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT id_estat_localitzacio)
       )                                                                        AS estat_localitzacio,
       (
           SELECT CONCAT_WS(' ', tv.nom, CONCAT(carrer, ','),
                            CONCAT(IFNULL(CONCAT(numero, '–', fins_numero), CONCAT(numero)), ','), c.nom,
                            CONCAT('(',
                                   (SELECT nom FROM ciutats WHERE id_ciutat = (SELECT c.id_provincia)),
                                   ')'))
           FROM localitzacions
                    INNER JOIN tipus_vies tv USING (id_tipus_via)
                    INNER JOIN ciutats c USING (id_ciutat)
           WHERE id_localitzacio = (SELECT a.id_localitzacio)
       )                                                     AS localitzacio,
       (
           SELECT e.nom
           FROM localitzacions
                    INNER JOIN establiments e ON localitzacions.id_localitzacio = e.id_establiment
           WHERE id_localitzacio = (SELECT a.id_localitzacio)
       )                                                     AS establiment,
       (
           SELECT IFNULL(JSON_ARRAYAGG(
                                 JSON_OBJECT(
                                         'id_formacio', id_formacio,
                                         'nom', nom,
                                         'nom_curt', nom_curt
                                     )
                             ), '[]')
           FROM formacions
                    INNER JOIN assajos_formacions USING (id_formacio)
           WHERE id_assaig = (SELECT a.id_assaig)
       )                                                                        AS formacions,
       (
           SELECT IFNULL(JSON_ARRAYAGG(
                                 JSON_OBJECT(
                                         'id_projecte', id_projecte,
                                         'titol', titol,
                                         'inicials', inicials,
                                         'color', color
                                     )
                             ), '[]')
           FROM projectes
                    INNER JOIN assajos_projectes USING (id_projecte)
           WHERE id_assaig = (SELECT a.id_assaig)
       )                                                                        AS projectes,
       (
           SELECT nom
           FROM veus
           WHERE veus.id_veu = (SELECT a.id_veu)
       )                                                                        AS nom_veu,
       (
           SELECT abreviatura
           FROM veus
           WHERE veus.id_veu = (SELECT a.id_veu)
       )                                                                        AS abreviatura_veu,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT a.id_estat_confirmacio)
       )                                                                        AS estat_confirmacio
FROM (
         SELECT DISTINCT *,
                         IFNULL((
                                    SELECT id_estat_confirmacio
                                    FROM assistents_esdeveniment
                                             INNER JOIN persones ON (id_soci = id_persona)
                                    WHERE id_persona = @id_soci
                                      AND id_esdeveniment = (SELECT a.id_assaig)
                                ), 1
                             )                                          AS id_estat_confirmacio,
                         IF((
                                SELECT retard
                                FROM assistents_esdeveniment
                                         INNER JOIN persones ON (id_soci = id_persona)
                                WHERE id_persona = @id_soci
                                  AND id_esdeveniment = (SELECT a.id_assaig)
                            ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)) AS retard,
                         (
                             SELECT IFNULL(
                                            (
                                                SELECT GROUP_CONCAT(id_veu)
                                                FROM socis_veu_moviment_projectes
                                                         INNER JOIN veus_moviments USING (id_veu_moviment)
                                                WHERE id_soci = @id_soci
                                            ), IFNULL(
                                                    (
                                                        SELECT GROUP_CONCAT(id_veu)
                                                        FROM socis_projectes_veu
                                                        WHERE id_soci = @id_soci
                                                    ),
                                                    (
                                                        SELECT GROUP_CONCAT(id_veu)
                                                        FROM socis_formacions_veus
                                                                 INNER JOIN socis_formacions USING (id_soci_formacio)
                                                                 INNER JOIN formacions USING (id_formacio)
                                                        WHERE id_soci = @id_soci
                                                    )
                                                )
                                        )
                         )                                              AS id_veu
         FROM assajos a
                  INNER JOIN esdeveniments ON (id_esdeveniment = id_assaig)
     ) a
WHERE ((
               NOT EXISTS(
                       (
                           SELECT *
                           FROM assajos
                                    INNER JOIN veus_convocades_assaig USING (id_assaig)
                           WHERE id_assaig = (SELECT a.id_assaig)
                       )
                   )
               AND EXISTS(
                       (
                           SELECT *
                           FROM assajos
                                    INNER JOIN assajos_formacions USING (id_assaig)
                                    INNER JOIN socis_formacions USING (id_formacio)
                           WHERE id_assaig = (SELECT a.id_assaig)
                             AND id_soci = @id_soci
                       )
                   )
           )
    OR a.id_veu IN
       (
           SELECT DISTINCT id_veu
           FROM assajos
                    INNER JOIN veus_convocades_assaig USING (id_assaig)
           WHERE id_assaig = (SELECT a.id_assaig)
       )
          )
LIMIT 4;
