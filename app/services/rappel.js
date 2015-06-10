/**
 * Rappel services
 *
 * @param models
 */

RappelService = function (models, dateService) {

  var self = {};
  var MONTH_OFFSET = 30;
  var TODAY_OFFSET = 0;
  var service = new dateService();

  self.findById = function(id){
    return new models.rappel({id: id}).fetch({withRelated: ['utilisateur']});
  }

  self.findAllForUpcomingDay = function(day_offset){
    var service = new dateService();
    var date = service.getDateWithOffset(day_offset);

    return new models.rappel({date_rappel: date, traite:0}).fetchAll({withRelated: ['utilisateur']});
  }

  self.findAllForNextMonth = function(){
    var dateOffset = service.getDateWithOffset(MONTH_OFFSET);
    var dateToday = service.getDateToday();
    return new models.rappel().query(function(qb){
      qb.where('date_rappel', '<=', dateOffset).andWhere('date_rappel', '>=', dateToday).andWhere('traite', '0');
    }).fetchAll({withRelated:'utilisateur'});
  }

  self.findAllForToday = function(){
    return rappel.findAllForUpcomingDay(TODAY_OFFSET);
  }

  self.findAllPastRappels = function(){
    var dateToday = service.getDateToday();
    return new models.rappel().query(function(qb){
      qb.where('date_rappel', '<', dateToday).andWhere('traite', '0');
    }).fetchAll({withRelated:'utilisateur'});
  }


  self.save = function(model){
    // The ORM doesn't remove the relations before doing operations on the entity.
    console.log(model.commentaire);
    if(model.utilisateur){
      if(!model.utilisateur_id){
        model.utilisateur_id = model.utilisateur.id;
      }
      delete(model.utilisateur);
    }
    return models.rappel.forge(model).save();
  }

  return self;

};

module.exports = RappelService;
