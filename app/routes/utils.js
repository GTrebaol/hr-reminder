var services = app.get('services');

module.exports.load = function (app, logger) {

    app.get('/api/utils/list/discr', function (req, res) {
        console.log("Routes - Utils::getDiscr");
        services.selectList.getListDiscr().then(function (model) {
            return res.json(model);
        }).catch(function (error) {
            console.log(error);
            res.json(500, error);
        });
    });


    app.post('/api/import/csv', function (req, res) {
        console.log("Routes - Utils::importCsv");
        if(services.csvImport.checkFile(req)) {
            var sqlImport = services.csvImport.readFile(req.files.file.path);
            services.csvImport.loadSql(sqlImport).then(function () {
                return res.json(200, 'zobi');
            }).catch(function (error) {
                console.log(error);
                res.json(500, error);
            });
        }else{
            res.json(500, 'wrong file type');
        }
    });


};
