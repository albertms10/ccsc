DELIMITER //
CREATE
    DEFINER = root@localhost FUNCTION `ordered_uuid`(uuid BINARY(36))
    RETURNS BINARY(16) DETERMINISTIC
    RETURN UNHEX(CONCAT(
            SUBSTR(uuid, 15, 4),
            SUBSTR(uuid, 10, 4),
            SUBSTR(uuid, 1, 8),
            SUBSTR(uuid, 20, 4),
            SUBSTR(uuid, 25)
        ));
//
DELIMITER ;
