SELECT a.*,
       ta.nom AS tipus
FROM agrupacions a
         INNER JOIN tipus_agrupacions ta USING (id_tipus_agrupacio);
