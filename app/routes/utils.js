var services = app.get('services');

module.exports.load = function (app, logger) {

    app.get('/api/utils/list/discr', function (req, res) {
        logger.debug("Routes - Utils::getDiscr");
        services.selectList.getListDiscr().then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            console.log(error);
            res.json(500, error);
        });
    });

    app.get('/api/utils/list/skill', function (req, res) {
        logger.debug("Routes - Utils::getSkills");
        services.skill.findAll().then(function (models) {
            return res.json(models);
        }).catch(function (error) {
            console.log(error);
            res.json(500, error);
        });
    });


    app.post('/api/import/csv', function (req, res) {
        logger.debug("Routes - Utils::importCsv");
        services.csvImport.readFile(req.files.file.path).then(function (quantity) {
            return res.status(200).json(quantity);
        }).catch(function (error) {
            console.log(error);
            res.status(500).json(error);
        });
    });


};
