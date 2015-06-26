/**
 * Services module fetch information from database
 * @returns {*}
 * @constructor
 */
var Services = function () {
    return Services.initialize.apply(null, arguments);
};

// Constructor for a new `Services` object, it accepts
// an active SqlConnection and initializes the appropriate
// services with the models.
Services.initialize = function (configuration, logger) {
    var services = {
                VERSION: '0.0.1'
            },
            knex = require('knex')({client: 'mysql', connection: configuration});

    knex.raw('select 1+1 as result').then(function () {
    }).catch(function (error) {
        logger.debug("Error :: Can't connect to the database, check your configuration. \n Code : " + error.code);
    });

    var assert = require('assert');
    var path = require('path');
    var _ = require('underscore');


    services.knex = knex;
    services.bookshelf = require('bookshelf')(knex);
    services.models = require('./models.js')(services.bookshelf);
    services.date = require('./utils/date.js')();
    services.selectList = require('./utils/selectList.js')(services.models);
    services.csvImport = require('./utils/csvImport.js')(services.bookshelf, logger);

    // Register all services
    services.user = require('./user.js')(services.models, logger, services.bookshelf, _);
    services.reminder = require('./reminder.js')(services.models, services.date);
    services.skill = require('./skill.js')(services.models, logger, _);


    return services;
};

module.exports = Services;
