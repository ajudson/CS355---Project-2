var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM TEAM;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Team_Name, callback) {
    var query = 'SELECT pot.* FROM TEAM ' +
        'LEFT JOIN Player_on_Team pot on TEAM.Team_Name = pot.Team_Name ' +
        'WHERE TEAM.Team_Name = ? ';
    var queryData = [Team_Name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO TEAM (Team_Name) VALUES (?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Team_Name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(Team_Name, callback) {
    var query = 'DELETE FROM TEAM WHERE Team_Name = ?';
    var queryData = [Team_Name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(Team_Name, callback) {
    var query = 'SELECT * FROM TEAM WHERE Team_Name = ?';
    var queryData = [Team_Name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE TEAM SET Team_Name = ? WHERE team_id = ? ';
    var queryData = [params.Team_Name, params.team_id];
    console.log(params.Team_Name);
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};