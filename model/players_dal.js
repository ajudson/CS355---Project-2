var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM PLAYERS p ' +
        'LEFT JOIN GAME_TITLES gt on p.gametitle_id = gt.gametitle_id;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(player_id, callback) {
    var query = 'CALL PlayerStats(?);';
    var queryData = [player_id];

    connection.query(query, queryData, function(err, result) {
        console.log(result);
        callback(err, result[0]);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO PLAYERS (Player_Name, gametitle_id) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Player_Name, params.gametitle_id];
console.log(params.Player_Name);
console.log(params.gametitle_id);
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(player_id, callback) {
    var query = 'DELETE FROM PLAYERS WHERE player_id = ?';
    var queryData = [player_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(player_id, callback) {
    var query = 'SELECT * FROM PLAYERS WHERE player_id = ?';
    var queryData = [player_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {

    var query = 'UPDATE PLAYERS SET Player_Name = ?, gametitle_id = ? WHERE player_id = ?;' +
        'UPDATE Player_on_Team SET player_id = ?, team_id = ? WHERE player_id = ?';
    var queryData = [params.Player_Name, params.gametitle_id, params.player_id];
    console.log(params.Player_Name);
    console.log(params.gametitle_id);
    console.log(params.player_id);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};