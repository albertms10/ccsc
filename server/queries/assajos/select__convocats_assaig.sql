SET @id_assaig = ?;

SELECT *,
       (
           SELECT nom
           FROM veus
           WHERE veus.id_veu = p.id_veu
       ) AS nom_veu,
       (
           SELECT abreviatura
           FROM veus
           WHERE veus.id_veu = p.id_veu
       ) AS abreviatura_veu,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = p.id_estat_confirmacio
       ) AS estat_confirmacio
FROM (
         SELECT DISTINCT sv.*,
                         IFNULL((
                                    SELECT id_estat_confirmacio
                                    FROM assistents_esdeveniment
                                             INNER JOIN persones ON (id_soci = id_persona)
                                    WHERE id_persona = sv.id_soci
                                      AND id_esdeveniment = @id_assaig
                                ), 1
                             )                                          AS id_estat_confirmacio,
                         IF((
                                SELECT retard
                                FROM assistents_esdeveniment
                                         INNER JOIN persones ON (id_soci = id_persona)
                                WHERE id_persona = sv.id_soci
                                  AND id_esdeveniment = @id_assaig
                            ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)) AS retard
         FROM socis
                  INNER JOIN socis_veus sv USING (id_soci)
         WHERE sv.id_soci IN (
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
