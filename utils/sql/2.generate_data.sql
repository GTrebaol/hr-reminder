

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES
(1,'Trebaol','Gwenaël','0607467217','trebaol@mail.io','apsidien','Master TIIL',5,'Javascript',50,'Bretagne',NULL,NULL,'0000-00-00','0000-00-00',NULL, NULL,NULL, NULL),
(2,'Lechauve','Thomas','0101010101','lechauve@mail.io','independant','Master en élevage de ver de terre',-23,'PHP, Python',150000,'2 jambes','Bouuh t\'es moche !',0,'LA SOURCE !','1901-12-22', NULL, NULL,NULL,NULL),
(3,'Ogor','Yohann','0102030405','ogor@mail.io','candidat','Master TIIL',5,'Java JEE',150,'Bretagne',NULL,NULL,NULL,NULL,NULL,NULL,NULL, NULL),
(4,'Le Sanguinaire','Léodagan',NULL,'jme-la-taille@en-biseau-voyez.kmltt','independant',NULL,NULL,NULL,NULL,NULL,'Ah nan mais j\'vous jure hein, des tanches pareilles, on devrait les mettre sous verre !',1,NULL,NULL,NULL,NULL,NULL, NULL),
(5,'Blaize','Père','0298632541','les-autres-intervalles@c-est-dla-merde.kmltt','apsidien','Aucune',5,NULL,NULL,NULL,'Non mais attendez, là, je crois qu\'on s\'est mal compris : vous avez une idée du temps qu\'il me faut pour tracer une lettre avec ces PUTAINS DE PLUMES ?!',1,NULL,NULL,NULL,NULL,NULL , NULL),
(6,'Macoincoin','Jeremy','02986532','bizu@mail.io','apsidien','?',5,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL, NULL),
(7,'Le blanche Fesse','Guenièvre','98653214','mefiez-vous@des-cons.kmltt','independant',NULL,10,NULL,NULL,NULL,'Comme vous me touchez pas, les choses de l’amour je m’assois dessus, et je parle au figuré, alors je m\'suis plongée dans la pâte d\'amande! Quand je vous regarde et que j\'vois comment vous m\'traitez, hein, je m\'dis que j’aurais meilleur compte d’aller d\'ici jusqu’à Rome à pieds pour en chercher parce que c’est finalement la meilleure chose qui me soit arrivée ….',1,NULL,NULL,NULL,NULL,NULL, NULL),
(8,'Jean','Marc',NULL,'jean-marc@bidoch.on','candidat',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL, NULL),
(9,'Le Gallois','Perceval',NULL,'gros-faisan@du-sud.kmltt','candidat',NULL,NULL,NULL,NULL,NULL,'Bref, tout ça pour dire, que je voudrais bien qu’on me considère en tant que Tel.',NULL,NULL,NULL,NULL,NULL,NULL, NULL),
(10,'De Vannes','Karadoc',NULL,'le-graal-par-ci@le-graal-par-la.kmltt','candidat',NULL,NULL,NULL,NULL,NULL,'De l’hypolipémie ! J’ai plus de gras dans le sang. Je vais me mettre à peler et à perdre mes cheveux…',NULL,NULL,NULL,NULL,NULL,NULL, NULL),
(11,'Pendragon','Arthur',NULL,'je-suis-pas-romain@merde.kmltt','independant',NULL,NULL,NULL,NULL,NULL,'Et si je vous dis que vous êtes deux glands, là, vous avez du péremptoire. C’est vous qui voyez.',NULL,NULL,NULL,NULL,NULL,NULL, NULL),
(12,'Le Jeune','Bohort',NULL,'je-suis-un-miserable@mecreants.kmltt','independant',NULL,NULL,NULL,NULL,NULL,'J\'irai me coucher quand vous m\'aurez juré qu\'il n\'y a pas dans cette forêt d\'animal plus dangereux que le lapin adulte !',NULL,NULL,NULL,NULL,NULL,NULL, NULL),
(13,'L\'enchanteur','Merlin',NULL,'evidemment-c-est@sans-alcool.kmltt','independant',NULL,NULL,NULL,NULL,NULL,'Vous n’êtes pas le plus fort, Môssieur Élias ! Quand on confond un clafoutis et une part de clafoutis, on vient pas la ramener !',NULL,NULL,NULL,NULL,NULL,NULL, NULL),
(14,'CALECA','Mael',NULL,NULL,'candidat',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL, NULL);
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `rappel` WRITE;
/*!40000 ALTER TABLE `rappel` DISABLE KEYS */;
INSERT INTO `rappel` VALUES
(1,'2015-06-08','2015-06-15','ESE',1,1),
(2,'2015-06-15',NULL,'relance',1,2),
(3,'2015-06-20','2015-06-25','2 eme entretien',0,3),
(4,'2015-05-09','2015-05-10','Commentaire test pour voir jusqu\'a quelle longueur je peux aller et si ca s\'affiche bien sur le front end !!! o/ o/ o/',1,2),
(5,'2015-06-19','2015-06-12','Huehuehuehuehuehuehuehue',1,2),
(6,'2015-06-19',NULL,'huehuehuehue',0,1),
(7,'2015-06-03',NULL,'Contacter le père blaize !',0,5),
(8,'2015-06-05',NULL,'Moi, j\'serais vous, je vous écouterais... Non, moi, j\'serais nous, je vous...',0,9);
/*!40000 ALTER TABLE `rappel` ENABLE KEYS */;
UNLOCK TABLES;
