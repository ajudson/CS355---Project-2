var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM GAME_TITLES;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Game_Title, callback) {
    var query = 'SELECT * FROM GAME_TITLES WHERE Game_Title = ?';
    var queryData = [Game_Title];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO GAME_TITLES (Game_Title, Team_Based_or_1v1) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Game_Title, params.Team_Based_or_1v1];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(Game_Title, callback) {
    var query = 'DELETE FROM GAME_TITLES WHERE Game_Title = ?';
    var queryData = [Game_Title];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(Game_Title, callback) {
    var query = 'SELECT * FROM GAME_TITLES WHERE Game_Title = ?';
    var queryData = [Game_Title];

    connection.query(query, queryData, function(err, result) {
        console.log('EDIT RESULT:');
        console.log(result);
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    console.log(params.Game_Title);
    console.log(params.gametitle_id);
    var query = 'UPDATE GAME_TITLES SET Game_Title = ?, Team_Based_or_1v1 = ? WHERE gametitle_id = ?';
    var queryData = [params.Game_Title, params.Team_Based_or_1v1, params.gametitle_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};