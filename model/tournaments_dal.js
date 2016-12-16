var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM TOURNAMENTS;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Tournament_Name, callback) {
    var query = 'SELECT t.*, tpit.Team_Name, tpit.Rank FROM TOURNAMENTS t ' +
        'LEFT JOIN Team_Participating_in_Tournament tpit on t.Tournament_Name = tpit.Tournament_Name ' +
        'WHERE t.Tournament_Name = ? ';
    var queryData = [Tournament_Name];

    connection.query(query, queryData, function(err, result) {
        console.log(err);
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO TOURNAMENTS (Tournament_Name) VALUES (?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Tournament_Name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(Tournament_Name, callback) {
    var query = 'DELETE FROM TOURNAMENTS WHERE Tournament_Name = ?';
    var queryData = [Tournament_Name];
console.log('WHY?');
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(Tournament_Name, callback) {
    var query = 'SELECT * FROM TOURNAMENTS WHERE Tournament_Name = ?';
    var queryData = [Tournament_Name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE TOURNAMENTS SET Tournament_Name = ? WHERE tournament_id = ?';
    var queryData = [params.Tournament_Name, params.tournament_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};