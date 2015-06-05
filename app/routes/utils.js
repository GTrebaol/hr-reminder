var services = app.get('services');

module.exports.load = function (app) {

  app.get('/api/utils/list/discr', function (req, res) {
      console.log("Routes - Utils::getDiscr");
      services.selectList.getListDiscr().then(function(model){
          return res.json(model);
      }).catch(function (error) {
          console.log(error);
          res.json(500, error);
      });
  });

};
