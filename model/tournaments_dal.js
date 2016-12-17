var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM TOURNAMENTS;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(tournament_id, callback) {
    console.log(3);
    var query = 'SELECT t.*, tpit.Rank, tm.Team_Name FROM TOURNAMENTS t ' +
        'LEFT JOIN Team_Participating_in_Tournament tpit on t.tournament_id = tpit.tournament_id ' +
        'LEFT JOIN TEAM tm on tpit.team_id = tm.team_id ' +
        'WHERE t.tournament_id = ? ';
    var queryData = [tournament_id];
    console.log(4);
    connection.query(query, queryData, function(err, result) {
        console.log(5);
        console.log(result);
        callback(err, result);

    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO TOURNAMENTS (Tournament_Name) VALUES (?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Tournament_Name];

    connection.query(query, queryData, function(err, result) {

        if(err){
            console.log(err);
        }
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!');

        var tournament_id = result.insertId;

        var query = 'INSERT INTO Team_Participating_in_Tournament (team_id, tournament_id) VALUES ?';


        var TeamParticipatingInTournamentData = [];
        for (var i=0; i < params.team_id.length; i++){
            console.log(tournament_id);
            console.log(params.team_id[i]);
            TeamParticipatingInTournamentData.push([params.team_id[i], tournament_id]);
        }
        console.log('array');
        console.log([TeamParticipatingInTournamentData]);
        connection.query(query, [TeamParticipatingInTournamentData], function(err, result){
            callback(err, result);
        });
    });
};

exports.delete = function(Tournament_Name, callback) {
    var query = 'DELETE FROM TOURNAMENTS WHERE Tournament_Name = ?';
    var queryData = [Tournament_Name];
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