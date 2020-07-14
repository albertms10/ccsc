SET @username = ?;

SELECT MAX(
               CAST(
                       SUBSTR(username,
                              LOCATE(@username, username) + LENGTH(@username)
                           ) AS UNSIGNED
                   )
           ) + 1 AS first_available_num
FROM usuaris
WHERE LOCATE(@username, username) = 1;
