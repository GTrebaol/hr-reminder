var services = app.get('services');

module.exports.load = function (app) {

    /**
     * find a utilisateur by its name
     */
    app.get('/api/utilisateur/:name/name', function (req, res) {
        console.log("Routes -  Utilisateur::findById");
        services.utilisateur.findByName(req.params.name).then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
    });

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
    });


    app.post('/api/utilisateur', function (req, res) {
        console.log("Routes -  Utilisateur::findAll paginated");
        var vars = req.body;
        vars.limit = 50;
        //Result count
        services.utilisateur.findAll(vars, true).then(function (models) {
            vars.count = models.length
        });
        services.utilisateur.findAll(vars, false).then(function (models) {
            return res.json({utilisateurs: models, vars: vars});
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
    });

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
    });


    app.put('/api/utilisateur/update', function (req, res) {
        console.log("Routes - Utilisateur::update");
        console.log(req.body);
        services.utilisateur.save(req.body).then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
    });

};
