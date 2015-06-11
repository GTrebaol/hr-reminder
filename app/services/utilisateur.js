/**
 *
 * Utilisateur Services
 *
 * @param models
 * @constructor
 */
UtilisateurService = function (models, logger, bookshelf) {


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
    var offset = filters.limit*(filters.currentPage-1);
    var query = bookshelf.knex('utilisateur');
    query.where(1, '=', 1)
    if(filters.nom){
      query.andWhere('nom', 'LIKE', '%'+filters.nom+'%');
    }

    if(filters.discr && Object.keys(filters.discr).length > 0){
      query.andWhere(function(){
        var first = true;
        for(var i in filters.discr){
          if(first){
            this.where('discr', '=', ''+i);
            first = false;
          }else{
            this.orWhere('discr', '=', ''+i)
          }
        }
      })
    }
    if(!count){
      query.limit(filters.limit).offset(offset);
    }
    return query;
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
