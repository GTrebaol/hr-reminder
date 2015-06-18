var services = app.get('services');

module.exports.load = function (app, logger) {


    app.get('/api/reminder/upcoming/:day', function (req, res) {
        logger.debug("Routes - Reminder::findAllForUpcomingDay");
        services.reminder.findAllForUpcomingDay(req.params.day).then(function (model) {
            return res.json(model)
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });

    app.get('/api/reminder/upcoming', function (req, res) {
        logger.debug("Routes -  Reminder::findAllForNextMonth");
        services.reminder.findAllForNextMonth().then(function (models) {
            return res.json(models);
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });

    app.get('/api/reminder/past', function (req, res) {
        logger.debug("Routes -  Reminder::findAllPastRappels");
        services.reminder.findAllPastRappels().then(function (models) {
            return res.json(models);
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });

    app.get('/api/reminder/:id', function (req, res) {
        logger.debug("Routes -  Reminder::findById");
        services.reminder.findById(req.params.id).then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });

    app.get('/api/reminder/:id/traite', function (req, res) {
        logger.debug("Routes -  Reminder::setTraite");
        services.reminder.findById(req.params.id).then(function (model) {
            services.reminder.setProcessed(model).then(function (model) {
                return res.json(model);
            });
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });


    app.put('/api/reminder/update', function (req, res) {
        logger.debug("Routes - Reminder::update");
        services.reminder.save(req.body).then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            logger.error(error);
            res.status(500).json(error);
        });
    });


};
