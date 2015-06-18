var services = app.get('services');

module.exports.load = function (app, logger) {

    /**
     * find a user by its name
     */
    app.get('/api/user/:name/name', function (req, res) {
        logger.debug("Routes -  Utilisateur::findById");
        services.user.findByName(req.params.name).then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });

    /**
     * find a user by its id
     */
    app.get('/api/user/:id', function (req, res) {
        logger.debug("Routes -  Utilisateur::findById");
        services.user.findById(req.params.id, true).then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });


    app.post('/api/user', function (req, res) {
        logger.debug("Routes -  Utilisateur::findAll paginated");
        var vars = req.body;
        vars.limit = 50;
        //Result count
        services.user.findAll(vars, true).then(function (models) {
            vars.count = models.length
        });
        services.user.findAll(vars, false).then(function (models) {
            return res.json({users: models, vars: vars});
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });

    /**
     * find all utilisateurs by their discr
     */
    app.get('/api/user/:discr/discr', function (req, res) {
        logger.debug("Routes -  Utilisateur::findAll");
        services.user.findAllByDiscr(req.params.discr).then(function (models) {
            return res.json(models);
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });


    app.put('/api/user/update', function (req, res) {
        logger.debug("Routes - Utilisateur::update");
        logger.debug(req.body);
        services.user.save(req.body).then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });

};
