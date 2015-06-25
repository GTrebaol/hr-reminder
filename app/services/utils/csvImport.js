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

    self.readFile = function (file) {
        return new Promise(function (success, reject) {
            try {
                var excelObj = xlsParser.readFile(file, {cellDate: true, cellHTML: true, cellNF: true});
                var sheets = Object.keys(excelObj.Sheets).map(function (k) {
                    return excelObj.Sheets[k];
                });
                var usersInterviews = buildObjectsCandidats(sheets[xslSheetMap['candidats']]);
                insertData(usersInterviews).then(function (res) {
                    success(res);
                }).catch(function (error) {
                    reject(error);
                });

            } catch (error) {
                reject(error);
            }
        });
    };


    var insertData = function (usersInterviews) {
        return new Promise(function (success, reject) {
            var users = usersInterviews['users'];
            var interviews = usersInterviews['interviews'];
            var promises = [];
            knex.transaction(function (trx) {
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    var interview = interviews[i];
                    promises.push(insertUserAndInterview(user, interview, trx));
                }
                return Promise.all(promises).then(function (dataArray) {
                    trx.commit();
                    success(dataArray.length);
                });
            });

        })
    };

    var insertUserAndInterview = function (user, interview, trx) {
        return new Promise(function (success, reject) {
            if (user.nom && user.prenom) {
                knex.insert(user).into('user').transacting(trx).then(function (id) {
                    var id_user = id[0];
                    interview.user_id = id_user;
                    knex.insert(interview).into('interview').transacting(trx).then(function (id) {
                        success();
                    });
                }).catch(function (error) {
                    logger.error(error);
                    reject(error);
                });
            }
        })
    };


    var buildObjectsCandidats = function (worksheet) {
        var users = [];
        var interviews = [];
        var endOfFile = -1;
        for (var i = 2; ; i++) {
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
                            if (attr == 10) {
                                var regex = "([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})";
                                var result = value.match(regex);
                                if (result && result.length >= 3) {
                                    if (type == 'n') {
                                        value = (result[3].length > 2 ? result[3] : "20" + result[3]) + "-" + (result[1].length > 1 ? result[1] : "0" + result[1]) + "-" + (result[2].length > 1 ? result[2] : "0" + result[2]);
                                    } else {
                                        value = result[3] + "-" + result[2] + "-" + result[1];
                                    }
                                }
                            }
                            interview[key] = value;
                        } else {
                            user[key] = value;
                        }
                    }
                } else {
                    i = endOfFile;
                    break;
                }
            }
            if (i != endOfFile) {
                users.push(user);
                interviews.push(interview);
            } else {
                break;
            }

        }
        return {'users': users, 'interviews': interviews};

    };

    return self;

}
;


module.exports = CsvImportService;
