var services = app.get('services');

module.exports.load = function (app) {
    app.get('/api/utilisateur/:id', function (req, res) {
      console.log("Routes -  Utilisateur::findById");
      services.utilisateur.findById(req.params.id).then(function (data) {
        return res.json(data);
      }).catch(function (error) {
            console.log(error);
            //TODO implement error handler;
      });
    })

};
