SET SQL_SAFE_UPDATES = 0;
DELETE FROM `reminder`.`rappel`;
DELETE FROM `reminder`.`utilisateur`;


INSERT INTO `reminder`.`utilisateur` (`id`, `nom`, `prenom`, `telephone`, `mail`, `discr`, `formation`, `annees_etudes`, `competences`, `pretentions`, `mobilite`, `date_embauche`, `dernier_ese`)
VALUES (1, 'Trebaol', 'Gwenael', '0607467217', 'trebaol@mail.io', 'apsidien', 'Master TIIL', '5', 'Javascript', '50k', 'Bretagne', '25/05/2014', '25/05/2015');

INSERT INTO `reminder`.`utilisateur` (`id`, `nom`, `prenom`, `telephone`, `mail`, `discr`, `formation`, `annees_etudes`, `competences`, `pretentions`, `mobilite`, `date_embauche`, `dernier_ese`)
VALUES (2, 'Lechauve', 'Thomas', '0101010101', 'lechauve@mail.io', 'independant', 'Master TIIL', '5', 'PHP, Python', '80k', 'Brest', NULL, NULL);

INSERT INTO `reminder`.`utilisateur` (`id`, `nom`, `prenom`, `telephone`, `mail`, `discr`, `formation`, `annees_etudes`, `competences`, `pretentions`, `mobilite`, `date_embauche`, `dernier_ese`)
VALUES (3, 'Ogor', 'Yohann', '0102030405', 'ogor@mail.io', 'candidat', 'Master TIIL', '5', 'Java JEE', '150k', 'Bretagne', NULL, NULL);

INSERT INTO `reminder`.`rappel`(date_rappel, date_rdv, commentaire, traite, utilisateur_id) VALUES ('2015-06-08', '2015-06-15', 'ESE', 0, 1);
INSERT INTO `reminder`.`rappel`(date_rappel, date_rdv, commentaire, traite, utilisateur_id) VALUES ('2015-06-15', NULL, 'relance', 0, 2);
INSERT INTO `reminder`.`rappel`(date_rappel, date_rdv, commentaire, traite, utilisateur_id) VALUES ('2015-06-20', '2015-06-25', '2 eme entretien', 0, 3);
