INSERT IGNORE INTO associacio (id_associacio, nom, nif)
VALUES (1, 'Associació Musical Catalana Crescendo', 'G63252407');


INSERT IGNORE INTO tipus_agrupacions (id_tipus_agrupacio, nom)
VALUES (1, 'Cor'),
       (2, 'Orquestra'),
       (3, 'Conjunt instrumental');


INSERT IGNORE INTO carrecs_junta (id_carrec_junta, carrec)
VALUES (1, 'Presidència'),
       (2, 'Secretaria'),
       (3, 'Tresoreria');


INSERT IGNORE INTO cursos (id_curs, inici, final)
VALUES ('16-17', '2016-09-01', '2017-07-01'),
       ('17-18', '2017-09-01', '2018-07-01'),
       ('18-19', '2018-09-01', '2019-07-01'),
       ('19-20', '2019-09-01', '2020-07-01');


INSERT IGNORE INTO paisos (id_pais, nom)
VALUES ('de', 'Alemanya'),
       ('es', 'Espanya'),
       ('fr', 'França');


INSERT IGNORE INTO tipus_vies (id_tipus_via, nom, abreviatura)
VALUES (1, 'avinguda', 'av'),
       (2, 'carrer', 'c'),
       (3, 'carreró', 'cró'),
       (4, 'carretera', 'ctra'),
       (5, 'passatge', 'ptge'),
       (6, 'passeig', 'pg'),
       (7, 'plaça', 'pl'),
       (8, 'rambla', 'rbla'),
       (9, 'ronda', 'rda'),
       (10, 'travessera', 'trav');


INSERT IGNORE INTO tipus_avisos (id_tipus_avis, nom, unique_name)
VALUES (1, 'Protecció de dades', 'proteccio_dades'),
       (2, 'Drets d’imatge', 'drets_imatge');


INSERT IGNORE INTO avisos (id_avis, titol, descripcio, titol_acceptacions, requerit, data_inici, data_final,
                           id_tipus_avis)
VALUES (1, NULL, NULL, 'Finalitats', 1, NULL, NULL, 1),
       (2, NULL, 'Atès que el dret a la imatge es troba regulat per l’article 18.1 de la
    Constitució, per la Llei Orgànica 1/1982 sobre el dret a l’honor, a la
    intimitat personal i familiar, i per la Llei Orgànica 15/1999 de Protecció
    de Dades de Caràcter Personal, sol·licitem el seu consentiment per publicar
    la seva imatge o veu, de forma clarament identificable, en fotografies i
    gravacions corresponents a les activitats pròpies de l’associació, i que
    s’exposin públicament a la pàgina web, revistes, YouTube o altres
    publicacions internes o de tercers, així com a reproduir-la públicament per
    a la promoció de les activitats i serveis de les entitats. El present
    consentiment i autorització s’atorga de forma gratuïta i amb renúncia formal
    a qualsevol contraprestació econòmica.', NULL, 0, NULL, NULL, 2);


INSERT IGNORE INTO seccions_avis (id_seccio_avis, titol, descripcio, id_avis)
VALUES (1, 'Responsable del tractament',
        'Aurora Ramírez — Secretaria [secretaria@cordecambrasantcugat.cat](mailto:secretaria@cordecambrasantcugat.cat)',
        1),
       (2, 'Dades de contacte del delegat de protecció de dades', 'Associació Musical Catalana Crescendo', 1),
       (3, 'Legitimació', 'Consentiment', 1),
       (4, 'Destinataris',
        'Farem servir un infraestructura virtual d’acord amb un model de computació en el núvol a través de [Heroku](https://www.heroku.com) {a l’empara de l’acord}.',
        1),
       (5, 'Drets de les persones', '- Sol·licitar l’accés, la rectificació o supressió, la limitació del tractament.
- Oposar-se al tractament.
- Portabilitat de les dades.', 1),
       (6, 'Terminis de conservació',
        'Mentre sigui necessari per a qualsevol dels propòsits que es descriuen a la nostra política de conservació.',
        1),
       (7, 'Reclamació',
        'Si no ha estat satisfet l’exercici dels vostres drets, podeu presentar una reclamació davant [secretaria@cordecambrasantcugat.cat](mailto:secretaria@cordecambrasantcugat.cat).',
        1),
       (8, 'Consentiment',
        'Dono el meu consentiment a l’Associació Musical Catalana Crescendo per al tractament de les dades de caràcter personal recollides en aquest formulari.',
        1);


INSERT IGNORE INTO acceptacions_avis (id_acceptacio_avis, titol, descripcio, requerida, form_name, id_avis)
VALUES (1, 'Gestió de l’associació', 'Tractament intern de les dades', 1, 'gestio_associacio', 1),
       (2, 'Enviament d’informació per correu electrònic', 'Tractament comercial de les dades', 0,
        'enviament_informacio', 1),
       (3, 'Cedir els drets d’imatge', NULL, 0, 'drets_imatge', 2);


INSERT IGNORE INTO roles (id_role, role)
VALUES (1, 'usuari'),
       (2, 'junta_directiva'),
       (3, 'director_musical'),
       (4, 'admin');
