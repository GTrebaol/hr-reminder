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
        'anciens consultants': 4,
        'independants': 1,
        'candidats': 0
    };
    var knex = bookshelf.knex;


    var consultantsMapping = {
        'nom': 'L',
        'prenom': 'M',
        'age': 'N',
        'formation': 'O',
        'annees_experience': 'P',
        'pretention': 'R',
        'mobilite': 'S',
        'remarques': 'T',
        'telephone': 'U',
        'decision': 'V',
        'date': 'C',
        /*        'competences': 'Q',*/
        'source': 'K'
    };


    self.checkFile = function (file) {
        //return assert.equal(path.extname(file.name), '.csv');
        return true;
    };


    self.readFile = function (file) {
        return new Promise(function (success, reject) {
            try {
                var excelObj = xlsParser.readFile(file);
                var sheets = Object.keys(excelObj.Sheets).map(function (k) {
                    return excelObj.Sheets[k];
                });
                var usersInterviews = buildObjectsCandidats(sheets[xslSheetMap['candidats']]);
                var quantityInsert = insertData(usersInterviews);
            } catch (error) {
                reject(error);
            }

            success();
        });
    };


    var insertData = function (usersInterviews) {
        var users = usersInterviews['users'];
        var interviews = usersInterviews['interviews'];
        knex.transaction(function (trx) {
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                var interview = interviews[i];
                insertUserAndInterview(user, interview, trx).then(function (res) {

                });
            }
        }).then(function (inserts) {
            logger.debug(inserts.length + ' entities saved');
            return inserts.length;

        }).catch(function (error) {
            logger.error(error);
        });

    };

    var insertUserAndInterview = function (user, interview, trx) {
        return new Promise(function (success, reject) {
            if (user.nom && user.prenom) {
                knex.insert(user).into('user').transacting(trx).then(function (id) {
                    var id_user = id[0];
                    interview.user_id = id_user;
                    knex.insert(interview).into('interview').transacting(trx).then(function (id) {
                        var id_inter = id[0];
                        success({id: id_user}, {id: id_inter});
                    }).catch(function (error) {
                        logger.error(error);
                        reject(error);
                    })
                }).catch(function (error) {
                    logger.error(error);
                    reject(error);
                });
            } else {
                reject();
            }
        })

    };


    var buildObjectsCandidats = function (worksheet) {
        var users = [];
        var interviews = [];
        var endOfFile = -1;
        for (var i = 2; i != endOfFile; i++) {
            var user = {};
            var interview = {};
            for (var attr = 0; attr < Object.keys(consultantsMapping).length; attr++) {
                var indexName = Object.keys(consultantsMapping)[attr];
                var xslCase = consultantsMapping[indexName] + i.toString();
                if (worksheet[xslCase] != undefined) {
                    var value = worksheet[xslCase].w;
                    var type = worksheet[xslCase].t;
                    var key = Object.keys(consultantsMapping)[attr];
                    if (type != 'e') {
                        if (attr == 9 || attr == 10) {
                            interview[key] = value;
                        } else {
                            user[key] = value;
                        }
                    }
                } else {
                    i = endOfFile;
                }
            }
            if (i != endOfFile) {
                users.push(user);
                interviews.push(interview);
            }

        }
        return {'users': users, 'interviews': interviews};

    };

    return self;

};


module.exports = CsvImportService;
