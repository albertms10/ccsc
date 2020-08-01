SELECT a.*,
       ta.nom AS tipus
FROM entitats a
         INNER JOIN tipus_entitats ta USING (id_tipus_entitat)
WHERE id_entitat = ?;
