SET @id_soci = ?;

SELECT *,
       (
           SELECT nom
           FROM veus
           WHERE veus.id_veu = a.id_veu
       ) AS nom_veu,
       (
           SELECT abreviatura
           FROM veus
           WHERE veus.id_veu = a.id_veu
       ) AS abreviatura_veu,
       (
           SELECT estat
           FROM estats_confirmacio
           WHERE id_estat_confirmacio = a.id_estat_confirmacio
       ) AS estat_confirmacio,
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
           WHERE id_esdeveniment_musical = a.id_assaig
       ) AS moviments
FROM (
         SELECT *,
                IFNULL((
                           SELECT id_estat_confirmacio
                           FROM assistents_esdeveniment
                                    INNER JOIN persones ON (id_soci = id_persona)
                           WHERE id_persona = @id_soci
                             AND id_esdeveniment = ae.id_assaig
                       ), 1
                    )                                          AS id_estat_confirmacio,
                IF((
                       SELECT retard
                       FROM assistents_esdeveniment
                                INNER JOIN persones ON (id_soci = id_persona)
                       WHERE id_persona = @id_soci
                         AND id_esdeveniment = ae.id_assaig
                   ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)) AS retard
         FROM assajos_estat ae,
              socis_veus sv
         WHERE dia_inici >= DATE(NOW())
           AND sv.id_soci = @id_soci
     ) a
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
                             AND id_soci = @id_soci
                       )
                   )
           )
    OR a.id_veu IN
       (
           SELECT DISTINCT id_veu
           FROM assajos
                    INNER JOIN veus_convocades_assaig USING (id_assaig)
           WHERE id_assaig = a.id_assaig
       )
          )
LIMIT ?;
