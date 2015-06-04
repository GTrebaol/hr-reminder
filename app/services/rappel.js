/**
 * Rappel services
 *
 * @param models
 */

RappelService = function (models, dateService) {

  var self = {};
  var MONTH_OFFSET = 30;
  var TODAY_OFFSET = 0;

  self.findById = function(id){
    return new models.rappel({id: id}).fetch({withRelated: ['utilisateur']});
  }

  self.findAllForUpcomingDay = function(day_offset){
    var service = new dateService();
    var date = service.getDateWithOffset(day_offset);

    return new models.rappel({date_rappel: date, traite:0}).fetchAll({withRelated: ['utilisateur']});
  }

  self.findAllForNextMonth = function(){
    var service = new dateService();
    var dateOffset = service.getDateWithOffset(MONTH_OFFSET);
    var dateToday = service.getDateToday();
    return new models.rappel().query(function(qb){
      qb.where('date_rappel', '<=', dateOffset).andWhere('date_rappel', '>=', dateToday).andWhere('traite', '0');
    }).fetchAll({withRelated:'utilisateur'});
  }

  self.findAllForToday = function(){
    return rappel.findAllForUpcomingDay(TODAY_OFFSET);
  }

  return self;

};

module.exports = RappelService;
