SET @id_soci = ?;

SELECT *,
       (
           SELECT nom
           FROM veus
           WHERE veus.id_veu = (SELECT a.id_veu)
       ) AS nom_veu,
       (
           SELECT abreviatura
           FROM veus
           WHERE veus.id_veu = (SELECT a.id_veu)
       ) AS abreviatura_veu,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT a.id_estat_confirmacio)
       ) AS estat_confirmacio
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