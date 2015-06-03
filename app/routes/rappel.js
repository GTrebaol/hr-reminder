var services = app.get('services');

module.exports.load = function (app) {


    app.get('/api/rappel/upcoming/:day', function (req, res) {
        console.log("Routes - Rappel::findAllForUpcomingDay");
        services.rappel.findAllForUpcomingDay(req.params.day).then(function (data) {
            return res.json(data)
        }).catch(function (error) {
            console.log(error)
        });
    });

    app.get('/api/rappel/upcoming', function (req, res) {
        console.log("Routes -  Rappel::findAllForNextMonth");
        services.rappel.findAllForNextMonth().then(function (data) {
            return res.json(data);
        }).catch(function (error) {
            console.log(error);
            //TODO implement error handler;
        });
    });

    app.get('/api/rappel/:id', function (req, res) {
        console.log("Routes -  Rappel::findById");
        services.rappel.findById(req.params.id).then(function (data) {
            return res.json(data);
        }).catch(function (error) {
            console.log(error);
            //TODO implement error handler;
        });
    });
};
