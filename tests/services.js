var expect = require('chai').expect,
        tracker;

// Connection to the database based on the environment.
var conf = require('../app/config/development.conf.js');

// Register services module
var services = require('../app/services')(conf.db);


describe('Service Tests', function () {


    describe('Utilisateur tests', function () {
        it('Should return a user :: user.findById', function (done) {
            var userId = 1;
            services.user.findById(userId).then(function (model) {
                expect(model).to.be.an.instanceOf(services.models.user);
                expect(model.get('id')).to.be.equals(userId);
                done();
            });
        });

    });

    describe('Rappel tests', function () {
        it('Should return a reminder :: reminder.findById', function (done) {
            var rappelId = 1;
            services.reminder.findById(rappelId).then(function (model) {
                expect(model).to.be.an.instanceOf(services.models.reminder);
                done();
            });
        });


        it('Should return a reminder and the connected user :: reminder.findById', function (done) {
            var rappelId = 1,
                    userId = 1,
                    discr = 'apsidien';
            services.reminder.findById(rappelId).then(function (model) {
                expect(model).to.be.an.instanceOf(services.models.reminder);
                expect(model.relations.user.get('discr')).to.be.equals(discr);
                done();
            });
        });

        it('Should return collection of rappels :: reminder.findAllForNextMonth', function (done) {
            services.reminder.findAllForNextMonth().then(function (model) {
                expect(model).to.be.an.instanceOf(services.bookshelf.Collection);
                done();
            });
        });

        it('Should return a collection of rappels :: reminder.findAllForUpcomingDay', function (done) {
            var day_offset = 1;
            services.reminder.findAllForUpcomingDay(day_offset).then(function (model) {
                expect(model).to.be.an.instanceOf(services.bookshelf.Collection);
                done();
            });
        });

        it('Should return collection of rappels :: reminder.findAllForToday', function (done) {
            services.reminder.findAllForToday().then(function (model) {
                expect(model).to.be.an.instanceOf(services.bookshelf.Collection);
                done();
            });
        });
    });
});
