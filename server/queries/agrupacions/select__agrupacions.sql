SELECT *
FROM agrupacions
         INNER JOIN tipus_agrupacions USING (id_tipus_agrupacio);
