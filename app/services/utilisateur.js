/**
 *
 * Utilisateur Services
 *
 * @param models
 * @constructor
 */
UtilisateurService = function (models, logger) {


  var self = {};
  var utilisateur_per_page = 50;

  /**
   * Retourne un utilisateur avec ces rappels
   *
   * @param id
   * @returns {models.utilisateur}
   */
   self.findById = function (id, withRelated) {
     return new models.utilisateur({id: parseInt(id)}).fetch({withRelated:['rappels']});;
   }


  self.findAll = function(filters, count){
    var queryFilter  = [];
    var limit = 10;
    var offset = 10*(filters.currentPage-1);
    logger.debug(queryFilter);
    if(count){
      return self.count();
    }else{
      return new models.utilisateur().query(searchQuery(filters, limit, offset)).fetchAll();
    }
  }

  var searchQuery = function(filters, limit, offset){
    return function(qb){
      if(filters.nom){
        qb.where('nom', 'LIKE', '%'+filters.nom+'%');
      }
      qb.limit(limit);
      qb.offset(offset);
    };
  }

  self.count = function(){
    return new models.utilisateur().query().count('id as cnt');
  }

  self.findByName = function(name){
    return new models.utilisateur().query(function(qb){
      qb.where('nom', 'LIKE', '%'+name+'');
    }).fetch({withRelated:['rappels']});
  }

  self.findAllByDiscr = function(discr){
    return new models.utilisateur({discr: discr}).fetchAll();
  }

  self.save = function(model){
    // The ORM doesn't remove the relations before doing operations on the entity.
    if(model.rappels){
      delete(model.rappels);
    }
    return models.utilisateur.forge(model).save();
  }

    return self;

}

module.exports = UtilisateurService;
