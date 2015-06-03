/**
 * Rappel services
 *
 * @param models
 */

RappelService = function (models, dateService) {

  var rappel = {};
  var MONTH_OFFSET = 30;
  var TODAY_OFFSET = 0;

  rappel.findById = function(id){
    return new models.rappel({id: id}).fetch({withRelated: ['utilisateur']});
  }

  rappel.findAllForUpcomingDay = function(day_offset){
    var service = new dateService();
    var date = service.getDateWithOffset(day_offset);

    return new models.rappel({date_rappel: date}).fetchAll({withRelated: ['utilisateur']});
  }

  rappel.findAllForNextMonth = function(){
    var service = new dateService();
    var dateOffset = service.getDateWithOffset(MONTH_OFFSET);
    var dateToday = service.getDateToday();
    return new models.rappel().query(function(qb){
      qb.where('date_rappel', '<', dateOffset).andWhere('date_rappel', '>=', dateToday);
    }).fetchAll();
  }

  rappel.findAllForToday = function(){
    return rappel.findAllForUpcomingDay(TODAY_OFFSET);
  }

  return rappel;

};

module.exports = RappelService;
