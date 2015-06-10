var services = app.get('services');

module.exports.load = function (app) {

  /**
  * find a utilisateur by its name
  */
  app.get('/api/utilisateur/:name/name', function (req, res) {
    console.log("Routes -  Utilisateur::findById");
    services.utilisateur.findByName(req.params.name).then(function (model){
      return res.json(model);
    }).catch(function (error) {
          console.log(error);
          res.status(500).json(error);
    });
  })

  /**
  * find a utilisateur by its id
  */
  app.get('/api/utilisateur/:id', function (req, res) {
    console.log("Routes -  Utilisateur::findById");
    services.utilisateur.findById(req.params.id, true).then(function (model) {
      return res.json(model);
    }).catch(function (error) {
          console.log(error);
          res.status(500).json(error);
    });
  })



  app.get('/api/utilisateur/p/:page', function (req, res) {
    console.log("Routes -  Utilisateur::findAll paginated");
    services.utilisateur.findAll(req.params.page).then(function (models) {
      services.utilisateur.count().then(function(count){
        return res.json({utilisateurs : models, count : count[0]['cnt'], page_size : 10});
      });
    }).catch(function (error) {
          console.log(error);
          res.status(500).json(error);
    });
  })

  /**
  * find all utilisateurs by their discr
  */
  app.get('/api/utilisateur/:discr/discr', function (req, res) {
    console.log("Routes -  Utilisateur::findAll");
    services.utilisateur.findAllByDiscr(req.params.discr).then(function (models) {
      return res.json(models);
    }).catch(function (error) {
          console.log(error);
          res.status(500).json(error);
    });
  })


  app.put('/api/utilisateur/update', function (req, res) {
      console.log("Routes - Utilisateur::update");
      services.utilisateur.save(req.body).then(function(model){
          return res.json(model);
      }).catch(function (error) {
          console.log(error);
          res.status(500).json(error);
      });
  });

};
