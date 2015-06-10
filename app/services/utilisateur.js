/**
 *
 * Utilisateur Services
 *
 * @param models
 * @constructor
 */
UtilisateurService = function (models) {


  var self = {};

  /**
   * Retourne un utilisateur avec ces rappels
   *
   * @param id
   * @returns {models.utilisateur}
   */
   self.findById = function (id, withRelated) {
     return new models.utilisateur({id: parseInt(id)}).fetch({withRelated:['rappels']});;
    }


    self.findAll = function(){
    return new models.utilisateur().fetchAll();
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
