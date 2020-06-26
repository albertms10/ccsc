SET @username = ?;

SELECT MAX(
               CAST(
                       SUBSTR(username,
                              LOCATE(@username COLLATE utf8_general_ci, username) + LENGTH(@username)
                           ) AS UNSIGNED
                   )
           ) + 1 AS first_available_num
FROM usuaris
WHERE LOCATE(@username COLLATE utf8_general_ci, username) = 1;
