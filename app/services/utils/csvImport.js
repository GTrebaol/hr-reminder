/**
 *
 * @returns {{}}
 * @constructor
 */
CsvImportService = function (bookshelf, logger) {

    var self = {};
    var assert = require('assert');
    var path = require('path');
    var fs = require('fs');
    var xlsParser = require('xlsx');
    var xslSheetMap = {
        'anciens consultants': 1,
        'independants': 2,
        'candidats': 3
    };


    self.checkFile = function (file) {
        //return assert.equal(path.extname(file.name), '.csv');
        return true;
    };


    self.readFile = function (file) {
        var excelObj = xlsParser.readFile(file);
        var sqlConsultant = buildSql(excelObj, xslSheetMap['anciens consultants']);
        var sqlIndeps = buildSql(excelObj, xslSheetMap['independants']);
        var sqlCandidats = buildSql(excelObj, xslSheetMap['candidats']);
    };


    var buildSql = function (excelObj) {



    };

    self.loadSql = function (sql) {

    };


    self.generateSql = function () {

    };
    return self;

};


module.exports = CsvImportService;
