var services = app.get('services');

module.exports.load = function (app) {


    app.get('/api/rappel/upcoming/:day', function (req, res) {
        console.log("Routes - Rappel::findAllForUpcomingDay");
        services.rappel.findAllForUpcomingDay(req.params.day).then(function (model) {
            return res.json(model)
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
    });

    app.get('/api/rappel/upcoming', function (req, res) {
        console.log("Routes -  Rappel::findAllForNextMonth");
        services.rappel.findAllForNextMonth().then(function (models) {
            return res.json(models);
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
    });

    app.get('/api/rappel/past', function (req, res) {
        console.log("Routes -  Rappel::findAllPastRappels");
        services.rappel.findAllPastRappels().then(function (models) {
            return res.json(models);
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
    });

    app.get('/api/rappel/:id', function (req, res) {
        console.log("Routes -  Rappel::findById");
        services.rappel.findById(req.params.id).then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
    });

    app.get('/api/rappel/:id/traite', function (req, res) {
        console.log("Routes -  Rappel::setTraite");
        services.rappel.findById(req.params.id).then(function (model) {
            services.rappel.setProcessed(model).then(function (model) {
                return res.json(model);
            });
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
    });


    app.put('/api/rappel/update', function (req, res) {
        console.log("Routes - Rappel::update");
        services.rappel.save(req.body).then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
    });


};
