/**
 *
 * Utilisateur Services
 *
 * @param models
 * @constructor
 */
UtilisateurService = function (models) {


  var utilisateur = {};

  /**
   * Retourne un utilisateur avec ces rappels
   *
   * @param id
   * @returns {models.utilisateur}
   */
   utilisateur.findById = function (id, withRelated) {
     return new models.utilisateur({id: parseInt(id)}).fetch({withRelated:['rappels']});;
    }


  utilisateur.findAll = function(){
    return new models.utilisateur().fetchAll();
  }

  utilisateur.findByName = function(name){
    return new models.utilisateur().query(function(qb){
      qb.where('nom', 'LIKE', '%'+name+'');
    }).fetch({withRelated:['rappels']});
  }

  utilisateur.findAllByDiscr = function(discr){
    return new models.utilisateur({discr: discr}).fetchAll();
  }

  utilisateur.save = function(model){
    // The ORM doesn't remove the relations before doing operations on the entity.
    if(model.rappels){
      delete(model.rappels);
    }
    return models.utilisateur.forge(model).save();
  }

    return utilisateur;

}

module.exports = UtilisateurService;
