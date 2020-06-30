CREATE VIEW usuaris AS
SELECT id_usuari, username, creacio, id_persona
FROM usuaris_complet;


CREATE VIEW esdeveniments_estat AS
SELECT DISTINCT id_esdeveniment,
                IFNULL(CONCAT(dia_inici, ' ', hora_inici), dia_inici)                    AS data_inici,
                DATE_FORMAT(dia_inici, '%Y-%m-%d')                                       AS dia_inici,
                hora_inici,
                IFNULL(CONCAT(IFNULL(dia_final, dia_inici), ' ', hora_final), dia_final) AS data_final,
                DATE_FORMAT(IFNULL(dia_final, dia_inici), '%Y-%m-%d')                    AS dia_final,
                hora_final,
                (
                    SELECT CONCAT_WS(' ',
                                     tv.nom,
                                     CONCAT(carrer, ','),
                                     CONCAT(IFNULL(CONCAT(numero, '–', fins_numero), CONCAT(numero)), ','),
                                     c.nom,
                                     CONCAT('(',
                                            (SELECT nom FROM ciutats WHERE id_ciutat = c.id_provincia),
                                            ')')
                               )
                    FROM localitzacions
                             INNER JOIN tipus_vies tv USING (id_tipus_via)
                             INNER JOIN ciutats c USING (id_ciutat)
                    WHERE id_localitzacio = e.id_localitzacio
                )                                                                        AS localitzacio,
                (
                    SELECT e2.nom
                    FROM localitzacions l
                             INNER JOIN establiments e2 ON (l.id_localitzacio = e2.id_establiment)
                    WHERE id_localitzacio = e.id_localitzacio
                )                                                                        AS establiment,
                id_esdeveniment_ajornat,
                e.id_estat_esdeveniment,
                (
                    SELECT estat
                    FROM estats_confirmacio
                    WHERE id_estat_confirmacio = e.id_estat_esdeveniment
                )                                                                        AS estat_esdeveniment,
                e.id_estat_localitzacio,
                (
                    SELECT estat
                    FROM estats_confirmacio
                    WHERE id_estat_confirmacio = e.id_estat_localitzacio
                )                                                                        AS estat_localitzacio
FROM esdeveniments e;


CREATE VIEW assajos_son_parcials AS
SELECT DISTINCT id_assaig,
                IF(EXISTS(
                           SELECT id_veu
                           FROM veus_convocades_assaig
                           WHERE id_assaig = a.id_assaig
                       ), TRUE, FALSE) AS es_parcial
FROM assajos a
         JOIN veus v;


CREATE VIEW assajos_veus AS
SELECT asp.*,
       IF(
                   NOT es_parcial
                   OR (
                       SELECT id_veu
                       FROM veus_convocades_assaig
                       WHERE id_veu = v.id_veu
                         AND id_assaig = asp.id_assaig
                   ), id_veu, NULL
           )       AS id_veu,
       nom         AS nom_veu,
       abreviatura AS abreviatura_veu
FROM assajos_son_parcials asp
         JOIN veus v;


CREATE VIEW assajos_estat AS
SELECT DISTINCT ee.*,
                id_assaig,
                IF(es_parcial, CAST(TRUE AS JSON), CAST(FALSE AS JSON)) AS es_parcial,
                CONCAT(
                        'Assaig',
                        IF(es_parcial, ' parcial', ''),
                        IF(es_general, ' general', ''),
                        IF(es_extra, ' extra', '')
                    )                                                   AS titol,
                (
                    SELECT IFNULL(JSON_ARRAYAGG(
                                          JSON_OBJECT(
                                                  'id_formacio', id_formacio,
                                                  'nom', nom,
                                                  'nom_curt', IFNULL(nom_curt, nom)
                                              )
                                      ), '[]')
                    FROM formacions
                             INNER JOIN assajos_formacions USING (id_formacio)
                    WHERE id_assaig = a.id_assaig
                )                                                       AS formacions,
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
                    WHERE id_assaig = a.id_assaig
                )                                                       AS projectes
FROM assajos a
         INNER JOIN esdeveniments_estat ee ON (ee.id_esdeveniment = a.id_assaig)
         LEFT JOIN assajos_son_parcials USING (id_assaig);


CREATE VIEW assajos_estat_moviments AS
SELECT *,
       (
           SELECT IFNULL(JSON_ARRAYAGG(
                                 JSON_OBJECT(
                                         'id_moviment', id_moviment,
                                         'id_obra', id_obra,
                                         'titol_moviment', m.titol,
                                         'titol_obra', o.titol,
                                         'ordre', ordre
                                     )
                             ), '[]')
           FROM moviments m
                    INNER JOIN moviments_esdeveniment_musical USING (id_moviment)
                    INNER JOIN obres o USING (id_obra)
           WHERE id_esdeveniment_musical = ae.id_assaig
       ) AS moviments
FROM assajos_estat ae;


CREATE VIEW projectes_full AS
SELECT DISTINCT p.id_projecte,
                titol,
                descripcio,
                inicials,
                color,
                data_inici,
                data_final,
                id_curs,
                YEAR(c.inici) AS any_inici_curs,
                YEAR(c.final) AS any_final_curs,
                (
                    SELECT IFNULL(JSON_ARRAYAGG(
                                          JSON_OBJECT(
                                                  'id_director', id_director,
                                                  'nom', nom_complet
                                              )
                                      ), '[]')
                    FROM directors_projectes dp
                             INNER JOIN persones p ON (dp.id_director = p.id_persona)
                    WHERE id_projecte = p.id_projecte
                )             AS directors,
                (
                    SELECT IFNULL(JSON_ARRAYAGG(
                                          JSON_OBJECT(
                                                  'id_formacio', formacions.id_formacio,
                                                  'nom', nom,
                                                  'nom_curt', IFNULL(nom_curt, nom)
                                              )
                                      ), '[]')
                    FROM projectes_formacions
                             INNER JOIN formacions USING (id_formacio)
                    WHERE id_projecte = p.id_projecte
                )             AS formacions
FROM projectes p
         INNER JOIN cursos c USING (id_curs)
ORDER BY data_inici IS NULL, data_inici, data_final IS NULL, data_final, titol;


CREATE VIEW socis_veus AS
SELECT id_soci,
       nom,
       cognoms,
       nom_complet,
       (
           SELECT IFNULL(
                          (
                              SELECT GROUP_CONCAT(id_veu)
                              FROM socis_veu_moviment_projectes
                                       INNER JOIN veus_moviments USING (id_veu_moviment)
                              WHERE id_soci = s.id_soci
                          ), IFNULL(
                                  (
                                      SELECT GROUP_CONCAT(id_veu)
                                      FROM socis_projectes_veu
                                      WHERE id_soci = s.id_soci
                                  ),
                                  (
                                      SELECT GROUP_CONCAT(id_veu)
                                      FROM socis_formacions_veus
                                               INNER JOIN socis_formacions USING (id_soci_formacio)
                                               INNER JOIN formacions USING (id_formacio)
                                      WHERE id_soci = s.id_soci
                                  )
                              )
                      )
       ) AS id_veu
FROM socis s
         INNER JOIN persones p ON (id_persona = id_soci);


CREATE VIEW socis_convocats_assajos AS
SELECT sv.id_soci,
       nom,
       cognoms,
       nom_complet,
       av.*,
       IF(retard, TRUE, FALSE)            AS retard,
       IFNULL(ec.id_estat_confirmacio, 1) AS id_estat_confirmacio,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = IFNULL(ec.id_estat_confirmacio, 1)
       )                                  AS estat
FROM assajos_veus av
         LEFT JOIN socis_veus sv USING (id_veu)
         LEFT JOIN assajos a USING (id_assaig)
         LEFT JOIN assistents_esdeveniment ae ON (ae.id_soci = sv.id_soci AND ae.id_esdeveniment = a.id_assaig)
         LEFT JOIN estats_confirmacio ec ON (ec.id_estat_confirmacio = ae.id_estat_confirmacio)
WHERE ((
               NOT EXISTS(
                       (
                           SELECT *
                           FROM assajos
                                    INNER JOIN veus_convocades_assaig USING (id_assaig)
                           WHERE id_assaig = a.id_assaig
                       )
                   )
               AND EXISTS(
                       (
                           SELECT *
                           FROM assajos
                                    INNER JOIN assajos_formacions USING (id_assaig)
                                    INNER JOIN socis_formacions USING (id_formacio)
                           WHERE id_assaig = a.id_assaig
                             AND id_soci = sv.id_soci
                       )
                   )
           )
    OR sv.id_veu IN
       (
           SELECT DISTINCT id_veu
           FROM assajos
                    INNER JOIN veus_convocades_assaig USING (id_assaig)
           WHERE id_assaig = a.id_assaig
       )
    )
  AND sv.id_soci IN (
    SELECT id_soci
    FROM socis
             INNER JOIN socis_formacions USING (id_soci)
             INNER JOIN assajos_formacions USING (id_formacio)
    WHERE id_assaig = a.id_assaig
)
ORDER BY id_veu, cognoms, nom;


CREATE VIEW moviments_full AS
SELECT o.id_obra,
       num_cataleg,
       m.id_moviment,
       ordre,
       durada,
       IFNULL(m.titol, o.titol) AS titol_moviment,
       o.titol                  AS titol_obra,
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
                    INNER JOIN moviments_projectes USING (id_projecte)
           WHERE id_moviment = m.id_moviment
       )                        AS projectes
FROM moviments m
         INNER JOIN obres o USING (id_obra)
ORDER BY o.any_inici IS NULL, o.titol, m.ordre;
