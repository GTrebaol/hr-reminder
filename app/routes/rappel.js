var services = app.get('services');

module.exports.load = function (app) {


    app.get('/api/rappel/upcoming/:day', function (req, res) {
        console.log("Routes - Rappel::findAllForUpcomingDay");
        services.rappel.findAllForUpcomingDay(req.params.day).then(function (model) {
            return res.json(model)
        }).catch(function (error) {
            console.log(error);
            res.json(500, error);
        });
    });

    app.get('/api/rappel/upcoming', function (req, res) {
        console.log("Routes -  Rappel::findAllForNextMonth");
        services.rappel.findAllForNextMonth().then(function (models) {
          return res.json(models);
        }).catch(function (error) {
            console.log(error);
            res.json(500, error);
        });
    });

    app.get('/api/rappel/past', function (req, res) {
        console.log("Routes -  Rappel::findAllPastRappels");
        services.rappel.findAllPastRappels().then(function(models) {
          return res.json(models);
        }).catch(function (error) {
            console.log(error);
            res.json(500, error);
        });
    });

    app.get('/api/rappel/:id', function (req, res) {
        console.log("Routes -  Rappel::findById");
        services.rappel.findById(req.params.id).then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            console.log(error);
            res.json(500, error);
        });
    });

    app.post('/api/rappel/:id/traite', function (req, res) {
        console.log("Routes -  Rappel::setTraite");
        services.rappel.findById(req.params.id).then(function (model) {
          model.save({traite:1}).then(function(){
            res.json({model : model, error: false, data: {message: 'User details updated'}});
          })
        }).catch(function (error) {
            console.log(error);
            res.json(500, error);
        });
    });



};
