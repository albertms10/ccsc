SELECT id_persona,
       p.nom,
       cognoms,
       nom_complet,
       (
           SELECT nom
           FROM veus
           WHERE id_veu = sav.id_veu
       ) AS nom_veu,
       (
           SELECT abreviatura
           FROM veus
           WHERE id_veu = sav.id_veu
       ) AS abreviatura_veu
FROM socis s
         INNER JOIN persones p ON (s.id_soci = p.id_persona)
         INNER JOIN socis_formacions USING (id_soci)
         LEFT JOIN socis_formacions_veus sav USING (id_soci_formacio)
         INNER JOIN formacions USING (id_formacio)
WHERE id_formacio = ?
ORDER BY id_veu;
