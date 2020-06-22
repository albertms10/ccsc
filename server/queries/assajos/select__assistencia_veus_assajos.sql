SELECT CONCAT(
               DATE_FORMAT(dia_inici, '%d/%m/%Y'),
               IFNULL(CONCAT(' ', TIME_FORMAT(hora_inici, '%H:%i')), '')
           )                                                 AS assaig,
       COUNT(CASE WHEN id_veu IN (1, 2) THEN id_persona END) AS sopranos,
       COUNT(CASE WHEN id_veu IN (3) THEN id_persona END)    AS contralts,
       COUNT(CASE WHEN id_veu IN (4) THEN id_persona END)    AS tenors,
       COUNT(CASE WHEN id_veu IN (5, 6) THEN id_persona END) AS baixos
FROM (
         SELECT DISTINCT id_assaig,
                         id_persona,
                         dia_inici,
                         hora_inici,
                         IFNULL(id_estat_confirmacio, 1) AS id_estat_confirmacio,
                         retard,
                         (
                             SELECT IFNULL(
                                            (
                                                SELECT GROUP_CONCAT(id_veu)
                                                FROM socis_veu_moviment_projectes
                                                         INNER JOIN veus_moviments USING (id_veu_moviment)
                                                WHERE id_soci = p.id_persona
                                            ), IFNULL(
                                                    (
                                                        SELECT GROUP_CONCAT(id_veu)
                                                        FROM socis_projectes_veu
                                                        WHERE id_soci = p.id_persona
                                                    ),
                                                    (
                                                        SELECT GROUP_CONCAT(id_veu)
                                                        FROM socis_formacions_veus
                                                                 INNER JOIN socis_formacions USING (id_soci_formacio)
                                                                 INNER JOIN formacions USING (id_formacio)
                                                        WHERE id_soci = p.id_persona
                                                    )
                                                )
                                        )
                         )                               AS id_veu
         FROM assistents_esdeveniment
                  INNER JOIN socis USING (id_soci)
                  INNER JOIN persones p ON socis.id_soci = p.id_persona
                  INNER JOIN esdeveniments e USING (id_esdeveniment)
                  INNER JOIN assajos a ON (id_esdeveniment = id_assaig)
         WHERE p.id_persona IN (
             SELECT id_soci
             FROM socis
                      INNER JOIN socis_formacions USING (id_soci)
                      INNER JOIN assajos_formacions USING (id_formacio)
             WHERE id_assaig = a.id_assaig
         )
     ) ae
WHERE NOT EXISTS(
        (
            SELECT *
            FROM assajos
                     INNER JOIN veus_convocades_assaig USING (id_assaig)
            WHERE id_assaig = ae.id_assaig
        )
    )
   OR ae.id_veu IN
      (
          SELECT DISTINCT id_veu
          FROM assajos
                   INNER JOIN veus_convocades_assaig USING (id_assaig)
          WHERE id_assaig = ae.id_assaig
      )
GROUP BY id_assaig, dia_inici, hora_inici
ORDER BY dia_inici, hora_inici;
