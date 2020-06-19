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
                                            (SELECT nom FROM ciutats WHERE id_ciutat = (SELECT c.id_provincia)),
                                            ')')
                               )
                    FROM localitzacions
                             INNER JOIN tipus_vies tv USING (id_tipus_via)
                             INNER JOIN ciutats c USING (id_ciutat)
                    WHERE id_localitzacio = (SELECT e.id_localitzacio)
                )                                                                        AS localitzacio,
                (
                    SELECT e2.nom
                    FROM localitzacions
                             INNER JOIN establiments e2 ON localitzacions.id_localitzacio = e2.id_establiment
                    WHERE id_localitzacio = (SELECT e.id_localitzacio)
                )                                                                        AS establiment,
                e.id_estat_esdeveniment,
                (
                    SELECT estat
                    FROM estats_confirmacio
                    WHERE id_estat_confirmacio = (SELECT e.id_estat_esdeveniment)
                )                                                                        AS estat_esdeveniment,
                e.id_estat_localitzacio,
                (
                    SELECT estat
                    FROM estats_confirmacio
                    WHERE id_estat_confirmacio = (SELECT e.id_estat_localitzacio)
                )                                                                        AS estat_localitzacio
FROM esdeveniments e;


CREATE VIEW assajos_estat AS
SELECT DISTINCT ee.*,
                id_assaig,
                CONCAT(
                        'Assaig',
                        IF(es_general, ' general', ''),
                        IF(es_extra, ' extra', '')
                    ) AS titol,
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
                    WHERE id_assaig = (SELECT a.id_assaig)
                )     AS formacions,
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
                )     AS projectes
FROM assajos a
         INNER JOIN esdeveniments_estat ee ON (ee.id_esdeveniment = a.id_assaig);


CREATE VIEW projectes_full AS
SELECT DISTINCT projectes.id_projecte,
                titol,
                descripcio,
                inicials,
                color,
                data_inici,
                data_final,
                id_curs,
                YEAR(cursos.inici) AS any_inici_curs,
                YEAR(cursos.final) AS any_final_curs,
                (
                    SELECT IFNULL(JSON_ARRAYAGG(
                                          JSON_OBJECT(
                                                  'id_director', id_director,
                                                  'nom', nom_complet
                                              )
                                      ), '[]')
                    FROM directors_projectes
                             INNER JOIN persones p ON directors_projectes.id_director = p.id_persona
                    WHERE id_projecte = (SELECT projectes.id_projecte)
                )                  AS directors,
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
                    WHERE id_projecte = (SELECT projectes.id_projecte)
                )                  AS formacions
FROM projectes
         INNER JOIN cursos USING (id_curs)
ORDER BY data_inici IS NULL, data_inici, data_final IS NULL, data_final, titol;
