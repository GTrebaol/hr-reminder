/**
 * Services module fetch information from database
 *
 */

var Services = function () {
    return Services.initialize.apply(null, arguments);
};

// Constructor for a new `Services` object, it accepts
// an active SqlConnection and initializes the appropriate
// services with the models.
Services.initialize = function (configuration) {
    var services = {
                VERSION: '0.0.1'
            },
    knex = require('knex')({client: 'mysql', connection: configuration});

    knex.raw('select 1+1 as result').then(function () {}).catch(function(error){
      console.log("Error :: Can't connect to the database, check your configuration. \n Code : "+error.code);
    });


    services.knex = knex;
    services.bookshelf = require('bookshelf')(knex);
    services.models = require('./models.js')(services.bookshelf);
    services.date = require('./utils/date.js');
    services.selectList = require('./utils/selectList.js')(services.models);

    // Register all services
    services.utilisateur = require('./utilisateur.js')(services.models);
    services.rappel = require('./rappel.js')(services.models, services.date);


    return services;
};

module.exports = Services;
