SET @id_assaig = ?;
SELECT *,
       (
           SELECT nom
           FROM veus
           WHERE veus.id_veu = (SELECT p.id_veu)
       ) AS nom_veu,
       (
           SELECT abreviatura
           FROM veus
           WHERE veus.id_veu = (SELECT p.id_veu)
       ) AS abreviatura_veu,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = (SELECT p.id_estat_confirmacio)
       ) AS estat_confirmacio
FROM (
         SELECT DISTINCT p.id_persona,
                         p.nom,
                         p.cognoms,
                         p.nom_complet,
                         IFNULL((
                                    SELECT id_estat_confirmacio
                                    FROM assistents_esdeveniment
                                             INNER JOIN persones ON (id_soci = id_persona)
                                    WHERE id_persona = (SELECT p.id_persona)
                                      AND id_esdeveniment = @id_assaig
                                ), 1
                             )                                          AS id_estat_confirmacio,
                         IF((
                                SELECT retard
                                FROM assistents_esdeveniment
                                         INNER JOIN persones ON (id_soci = id_persona)
                                WHERE id_persona = (SELECT p.id_persona)
                                  AND id_esdeveniment = @id_assaig
                            ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)) AS retard,
                         (
                             SELECT IFNULL(
                                            (
                                                SELECT GROUP_CONCAT(id_veu)
                                                FROM socis_veu_moviment_projectes
                                                         INNER JOIN veus_moviments USING (id_veu_moviment)
                                                WHERE id_soci = (SELECT p.id_persona)
                                            ), IFNULL(
                                                    (
                                                        SELECT GROUP_CONCAT(id_veu)
                                                        FROM socis_projectes_veu
                                                        WHERE id_soci = (SELECT p.id_persona)
                                                    ),
                                                    (
                                                        SELECT GROUP_CONCAT(id_veu)
                                                        FROM socis_formacions_veus
                                                                 INNER JOIN socis_formacions USING (id_soci_formacio)
                                                                 INNER JOIN formacions USING (id_formacio)
                                                        WHERE id_soci = (SELECT p.id_persona)
                                                    )
                                                )
                                        )
                         )                                              AS id_veu
         FROM socis
                  INNER JOIN persones p ON socis.id_soci = p.id_persona
         WHERE p.id_persona IN (
             SELECT id_soci
             FROM socis
                      INNER JOIN socis_formacions USING (id_soci)
                      INNER JOIN assajos_formacions USING (id_formacio)
             WHERE id_assaig = @id_assaig
         )
     ) p
WHERE NOT EXISTS(
        (
            SELECT *
            FROM assajos
                     INNER JOIN veus_convocades_assaig USING (id_assaig)
            WHERE id_assaig = @id_assaig
        )
    )
   OR p.id_veu IN
      (
          SELECT DISTINCT id_veu
          FROM assajos
                   INNER JOIN veus_convocades_assaig USING (id_assaig)
          WHERE id_assaig = @id_assaig
      )
ORDER BY p.id_veu, nom, cognoms;
