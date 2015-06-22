

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(1,'Trebaol','Gwenaël','0607467217','trebaol@mail.io',25,'ancien consultant','Master TIIL',5,50000,'Bretagne',NULL,NULL,NULL),
(2,'Lechauve','Thomas','0101010101','lechauve@mail.io',25,'independant','Master en élevage de ver de terre',-23, 150000,'2 jambes','Bouuh t\'es moche !','LA SOURCE !','1901-12-22'),
(3,'Ogor','Yohann','0102030405','ogor@mail.io',25,'candidat','Master TIIL',5, 150,'Bretagne',NULL,NULL,NULL),
(4,'Le Sanguinaire','Léodagan',NULL,'jme-la-taille@en-biseau-voyez.kmltt',50,'independant',NULL,NULL,NULL,NULL,'Ah nan mais j\'vous jure hein, des tanches pareilles, on devrait les mettre sous verre !',NULL,NULL),
(5,'Blaize','Père','0298632541','les-autres-intervalles@c-est-dla-merde.kmltt',30,'ancien consultant',5,NULL,NULL,NULL,'Non mais attendez, là, je crois qu\'on s\'est mal compris : vous avez une idée du temps qu\'il me faut pour tracer une lettre avec ces PUTAINS DE PLUMES ?!',NULL,NULL),
(7,'Le blanche Fesse','Guenièvre','98653214','mefiez-vous@des-cons.kmltt',40,'independant',10,NULL,NULL,NULL,'Comme vous me touchez pas, les choses de l’amour je m’assois dessus, et je parle au figuré, alors je m\'suis plongée dans la pâte d\'amande! Quand je vous regarde et que j\'vois comment vous m\'traitez, hein, je m\'dis que j’aurais meilleur compte d’aller d\'ici jusqu’à Rome à pieds pour en chercher parce que c’est finalement la meilleure chose qui me soit arrivée ….',NULL,NULL),
(9,'Le Gallois','Perceval',NULL,'gros-faisan@du-sud.kmltt',35,'candidat',NULL,NULL,NULL,NULL,'Bref, tout ça pour dire, que je voudrais bien qu’on me considère en tant que Tel.',NULL,NULL),
(10,'De Vannes','Karadoc',NULL,'le-graal-par-ci@le-graal-par-la.kmltt',35,'candidat',NULL,NULL,NULL,NULL,'De l’hypolipémie ! J’ai plus de gras dans le sang. Je vais me mettre à peler et à perdre mes cheveux…',NULL,NULL),
(11,'Pendragon','Arthur',NULL,'je-suis-pas-romain@merde.kmltt',40,'independant',NULL,NULL,NULL,NULL,'Et si je vous dis que vous êtes deux glands, là, vous avez du péremptoire. C’est vous qui voyez.',NULL,NULL),
(12,'Le Jeune','Bohort',NULL,'je-suis-un-miserable@mecreants.kmltt',30,'independant',NULL,NULL,NULL,NULL,'J\'irai me coucher quand vous m\'aurez juré qu\'il n\'y a pas dans cette forêt d\'animal plus dangereux que le lapin adulte !',NULL,NULL),
(13,'L\'enchanteur','Merlin',NULL,'evidemment-c-est@sans-alcool.kmltt',99,'independant',NULL,NULL,NULL,NULL,'Vous n’êtes pas le plus fort, Môssieur Élias ! Quand on confond un clafoutis et une part de clafoutis, on vient pas la ramener !',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `reminder` WRITE;
/*!40000 ALTER TABLE `reminder` DISABLE KEYS */;
INSERT INTO `reminder` VALUES
(1,'2015-06-08','2015-06-15','ESE',1,1),
(2,'2015-06-15',NULL,'relance',1,2),
(3,'2015-06-20','2015-06-25','2 eme entretien',0,3),
(4,'2015-05-09','2015-05-10','Commentaire test pour voir jusqu\'a quelle longueur je peux aller et si ca s\'affiche bien sur le front end !!! o/ o/ o/',1,2),
(5,'2015-06-19','2015-06-12','Huehuehuehuehuehuehuehue',1,2),
(6,'2015-06-19',NULL,'huehuehuehue',0,1),
(7,'2015-06-03',NULL,'Contacter le père blaize !',0,5),
(8,'2015-06-05',NULL,'Moi, j\'serais vous, je vous écouterais... Non, moi, j\'serais nous, je vous...',0,9);
/*!40000 ALTER TABLE `reminder` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES
(1, 'Java'),
(2, 'PHP'),
(3, 'Python'),
(4, 'AngularJS'),
(5, 'NodeJS'),
(6, 'SQL');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `user_has_skill` WRITE;
/*!40000 ALTER TABLE `user_has_skill` DISABLE KEYS */;
INSERT INTO `user_has_skill` VALUES
(1, '1', '4'),
(2, '1', '5'),
(3, '1', '6'),
(4, '1', '2'),
(5, '1', '1'),
(6, '2', '1'),
(7, '2', '2'),
(8, '2', '3'),
(9, '2', '4'),
(10, '2', '5'),
(11, '2', '6'),
(12, '3', '1'),
(13, '3', '4');
/*!40000 ALTER TABLE `user_has_skill` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES
(1, 'Arkea'),
(2, 'Paul Boye');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `user_has_customer` WRITE;
/*!40000 ALTER TABLE `user_has_customer` DISABLE KEYS */;
INSERT INTO `user_has_customer` VALUES
(1, 1, 1, '2015-06-29', NULL),
(2, 1, 2, '2014-05-29', '2015-05-15');
/*!40000 ALTER TABLE `user_has_customer` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `interview` WRITE;
/*!40000 ALTER TABLE `interview` DISABLE KEYS */;
INSERT INTO `interview` VALUES
(1, 'ESE', NULL, '1'),
(2, 'Premier entretien', '1', '2');
/*!40000 ALTER TABLE `interview` ENABLE KEYS */;
UNLOCK TABLES;



