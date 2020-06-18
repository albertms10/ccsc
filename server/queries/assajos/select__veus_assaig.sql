SELECT *,
       IF(
               EXISTS(
                       SELECT *
                       FROM veus
                                INNER JOIN veus_convocades_assaig USING (id_veu)
                       WHERE id_assaig = ?
                         AND id_veu = (SELECT v.id_veu)
                   ), CAST(TRUE AS JSON), CAST(FALSE AS JSON)
           ) AS convocada
FROM veus v;
