var expect = require('chai').expect,
    tracker;

// Connection to the database based on the environment.
var conf = require('../app/config/development.conf.js');

// Register services module
var services = require('../app/services')(conf.db);


describe('Service Tests', function () {


    describe('Utilisateur tests', function () {
        it('Should return a user :: utilisateur.findById', function (done) {
            var userId = 1;
            services.utilisateur.findById(userId).then(function (model) {
                expect(model).to.be.an.instanceOf(services.models.utilisateur);
                expect(model.get('id')).to.be.equals(userId);
                done();
            });
        });

    });

    describe('Rappel tests', function () {
      it('Should return a rappel :: rappel.findById', function (done) {
        var rappelId = 1;
        services.rappel.findById(rappelId).then(function (model) {
            expect(model).to.be.an.instanceOf(services.models.rappel);
            done();
        });
      });


      it('Should return a rappel and the connected user :: rappel.findById', function (done) {
        var rappelId = 1,
            userId = 1,
            discr = 'apsidien';
        services.rappel.findById(rappelId).then(function (model) {
            expect(model).to.be.an.instanceOf(services.models.rappel);
            expect(model.relations.utilisateur.get('discr')).to.be.equals(discr);
            done();
        });
      });

      it('Should return collection of rappels :: rappel.findAllForNextMonth', function (done) {
        services.rappel.findAllForNextMonth().then(function (model) {
            expect(model).to.be.an.instanceOf(services.bookshelf.Collection);
            done();
        });
      });

      it('Should return a collection of rappels :: rappel.findAllForUpcomingDay', function (done) {
        var day_offset = 1;
        services.rappel.findAllForUpcomingDay(day_offset).then(function (model) {
            expect(model).to.be.an.instanceOf(services.bookshelf.Collection);
            done();
        });
      });

      it('Should return collection of rappels :: rappel.findAllForToday', function (done) {
        services.rappel.findAllForToday().then(function (model) {
            expect(model).to.be.an.instanceOf(services.bookshelf.Collection);
            done();
        });
      });
    });
});
