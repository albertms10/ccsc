SELECT EXISTS(
               SELECT *
               FROM emails_espera
               WHERE email = ?
           ) AS email_exists;
