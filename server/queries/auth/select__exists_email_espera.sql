SELECT EXISTS(
               SELECT *
               FROM emails_espera
               WHERE ?
           ) AS email_exists;
