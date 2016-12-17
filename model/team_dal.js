var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM TEAM;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(team_id, callback) {
    var query = 'SELECT p.player_id, p.Player_Name, TEAM.team_name FROM TEAM ' +
        'LEFT JOIN Player_on_Team pot on TEAM.team_id = pot.team_id ' +
        'LEFT JOIN PLAYERS p on pot.player_id = p.player_id ' +
        'WHERE TEAM.team_id = ? ';
    var queryData = [team_id];

    connection.query(query, queryData, function(err, result) {
        console.log(team_id);
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