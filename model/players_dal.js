var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM PLAYERS;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Player_Name, callback) {
    var query = 'SELECT * FROM PLAYERS WHERE Player_Name = ?';
    var queryData = [Player_Name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO PLAYERS (Player_Name, Game_Title) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Player_Name, params.Game_Title];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(Player_Name, callback) {
    var query = 'DELETE FROM PLAYERS WHERE Player_Name = ?';
    var queryData = [Player_Name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(Player_Name, callback) {
    var query = 'SELECT * FROM PLAYERS WHERE Player_Name = ?';
    var queryData = [Player_Name];

    connection.query(query, queryData, function(err, result) {
        console.log('EDIT RESULT:');
        console.log(result);
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    console.log(params.PLAYERS);
    console.log(params.Player_Name);
    console.log(params.player_id);
    var query = 'UPDATE PLAYERS SET Player_Name = ?, Game_Title = ? WHERE player_id = ?';
    var queryData = [params.Player_Name, params.Game_Title, params.player_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};