var services = app.get('services');

module.exports.load = function (app) {

  /**
  * find a utilisateur by its name
  */
  app.get('/api/utilisateur/:name/name', function (req, res) {
    console.log("Routes -  Utilisateur::findById");
    services.utilisateur.findByName(req.params.name).then(function (data) {
      return res.json(data);
    }).catch(function (error) {
          console.log(error);
          //TODO implement error handler;
    });
  })

  /**
  * find a utilisateur by its id
  */
  app.get('/api/utilisateur/:id', function (req, res) {
    console.log("Routes -  Utilisateur::findById");
    services.utilisateur.findById(req.params.id, true).then(function (data) {
      return res.json(data);
    }).catch(function (error) {
          console.log(error);
          res.json(500, error);
    });
  })

  /**
  * find all utilisateurs
  */
  app.get('/api/utilisateur', function (req, res) {
    console.log("Routes -  Utilisateur::findAll");
    services.utilisateur.findAll().then(function (data) {
      return res.json(data);
    }).catch(function (error) {
          console.log(error);
          res.json(500, error);
    });
  })

  /**
  * find all utilisateurs by their discr
  */
  app.get('/api/utilisateur/:discr/discr', function (req, res) {
    console.log("Routes -  Utilisateur::findAll");
    services.utilisateur.findAllByDiscr(req.params.discr).then(function (data) {
      return res.json(data);
    }).catch(function (error) {
          console.log(error);
          res.json(500, error);
    });
  })


  app.put('/api/utilisateur/update', function (req, res) {
      console.log("Routes - Utilisateur::update");
      services.utilisateur.save(req.body).then(function(model){
          return res.json(model);
      }).catch(function (error) {
          console.log(error);
          res.json(500, error);
      });
  });

};
