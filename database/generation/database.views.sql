CREATE OR REPLACE VIEW usuaris AS
SELECT id_usuari, username, creacio, id_persona
FROM usuaris_complet;


CREATE OR REPLACE VIEW usuaris_info AS
SELECT id_usuari,
       username,
       nom,
       cognoms,
       es_dona,
       id_persona,
       hash,
       (
           SELECT JSON_ARRAYAGG(role)
           FROM roles_usuaris
                    INNER JOIN roles USING (id_role)
           WHERE id_usuari = uc.id_usuari
       )     AS roles,
       (
           SELECT CAST(IFNULL(JSON_ARRAYAGG(unique_name), '[]') AS JSON)
           FROM avisos
                    INNER JOIN tipus_avisos USING (id_tipus_avis)
                    INNER JOIN acceptacions_avis av USING (id_avis)
           WHERE requerida IS TRUE
             AND NOT EXISTS(
                   SELECT *
                   FROM socis_acceptacions
                   WHERE id_acceptacio_avis = av.id_acceptacio_avis
                     AND accepta IS TRUE
                     AND id_soci = p.id_persona
               )
       )     AS avisos,
       EXISTS(
               SELECT *
               FROM socis s
                        INNER JOIN historial_socis hs ON (s.id_soci = hs.id_historial_soci)
               WHERE id_soci = p.id_persona
                 AND CURRENT_DATE
                   BETWEEN data_alta
                   AND IFNULL(DATE_SUB(data_baixa, INTERVAL 1 DAY), CURRENT_DATE)
               ORDER BY data_alta DESC
           ) AS es_actiu
FROM usuaris_complet uc
         LEFT JOIN persones p USING (id_persona);


CREATE OR REPLACE VIEW esdeveniments_estat AS
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


CREATE OR REPLACE VIEW assajos_son_parcials AS
SELECT DISTINCT id_assaig,
                EXISTS(
                        SELECT id_veu
                        FROM veus_convocades_assaig
                        WHERE id_assaig = a.id_assaig
                    ) AS es_parcial
FROM assajos a
         JOIN veus v;


CREATE OR REPLACE VIEW assajos_veus AS
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


CREATE OR REPLACE VIEW assajos_estat AS
SELECT DISTINCT ee.*,
                id_assaig,
                es_parcial,
                CONCAT(
                        'Assaig',
                        IF(es_parcial, ' parcial', ''),
                        IF(es_general, ' general', ''),
                        IF(es_extra, ' extra', '')
                    ) AS titol,
                (
                    SELECT CAST(IFNULL(JSON_ARRAYAGG(
                                               JSON_OBJECT(
                                                       'id_formacio', id_formacio,
                                                       'nom', nom,
                                                       'nom_curt', IFNULL(nom_curt, nom)
                                                   )
                                           ), '[]') AS JSON)
                    FROM formacions
                             INNER JOIN assajos_formacions USING (id_formacio)
                    WHERE id_assaig = a.id_assaig
                )     AS formacions,
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
                             INNER JOIN assajos_projectes USING (id_projecte)
                    WHERE id_assaig = a.id_assaig
                )     AS projectes
FROM assajos a
         INNER JOIN esdeveniments_estat ee ON (ee.id_esdeveniment = a.id_assaig)
         LEFT JOIN assajos_son_parcials USING (id_assaig);


CREATE OR REPLACE VIEW assajos_estat_moviments AS
SELECT *,
       (
           SELECT CAST(IFNULL(JSON_ARRAYAGG(
                                      JSON_OBJECT(
                                              'id_moviment', id_moviment,
                                              'id_obra', id_obra,
                                              'titol_moviment', titol_moviment,
                                              'titol_obra', titol_obra,
                                              'ordre', ordre,
                                              'es_unic_moviment', es_unic_moviment
                                          )
                                  ), '[]') AS JSON)
           FROM moviments_full m
                    INNER JOIN moviments_esdeveniment_musical USING (id_moviment)
           WHERE id_esdeveniment_musical = ae.id_assaig
       ) AS moviments
FROM assajos_estat ae;


CREATE OR REPLACE VIEW projectes_full AS
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
                    SELECT CAST(IFNULL(JSON_ARRAYAGG(
                                               JSON_OBJECT(
                                                       'id_director', id_director,
                                                       'nom', nom_complet
                                                   )
                                           ), '[]') AS JSON)
                    FROM directors_projectes dp
                             INNER JOIN persones p ON (dp.id_director = p.id_persona)
                    WHERE id_projecte = p.id_projecte
                )             AS directors,
                (
                    SELECT CAST(IFNULL(JSON_ARRAYAGG(
                                               JSON_OBJECT(
                                                       'id_formacio', formacions.id_formacio,
                                                       'nom', nom,
                                                       'nom_curt', IFNULL(nom_curt, nom)
                                                   )
                                           ), '[]') AS JSON)
                    FROM projectes_formacions
                             INNER JOIN formacions USING (id_formacio)
                    WHERE id_projecte = p.id_projecte
                )             AS formacions
FROM projectes p
         INNER JOIN cursos c USING (id_curs);


CREATE OR REPLACE VIEW socis_veus AS
SELECT id_persona,
       id_soci,
       nom,
       cognoms,
       nom_complet,
       (
           SELECT COALESCE(
                          (
                              SELECT GROUP_CONCAT(id_veu)
                              FROM socis_veu_moviment_projectes
                                       INNER JOIN veus_moviments USING (id_veu_moviment)
                              WHERE id_soci = s.id_soci
                          ),
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
       ) AS id_veu
FROM socis s
         INNER JOIN persones p ON (id_persona = id_soci);


CREATE OR REPLACE VIEW socis_convocats_assajos AS
SELECT sv.id_persona,
       sv.id_soci,
       nom,
       cognoms,
       nom_complet,
       av.*,
       amb_retard,
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
);


CREATE OR REPLACE VIEW moviments_full AS
SELECT o.id_obra,
       num_cataleg,
       m.id_moviment,
       ordre,
       (
           SELECT NOT EXISTS(
                   (
                       SELECT *
                       FROM moviments
                       WHERE id_obra = o.id_obra
                         AND id_moviment <> m.id_moviment
                   )
               )
       )                        AS es_unic_moviment,
       durada,
       IFNULL(m.titol, o.titol) AS titol_moviment,
       o.titol                  AS titol_obra,
       any_inici,
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
                    INNER JOIN moviments_projectes USING (id_projecte)
           WHERE id_moviment = m.id_moviment
       )                        AS projectes
FROM moviments m
         INNER JOIN obres o USING (id_obra);
