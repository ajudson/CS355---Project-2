var express = require('express');
var router = express.Router();
var players_dal = require('../model/players_dal');
var gametitle_dal = require('../model/gametitle_dal');

//view all players
router.get('/all', function(req, res) {
    players_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            console.log();
            res.render('players/playersViewAll', { 'result':result});
        }
    });
});


//view player for a given id
router.get('/', function(req, res){
    if(req.query.Player_Name == null) {
        res.send('Player_Name is null');
    }
    else {
        players_dal.getById(req.query.Player_Name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('players/playersViewById', {'result': result});
            }
        });
    }
});

//add a player
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    players_dal.getAll(function(err,result) {
        gametitle_dal.getAll(function(err, GAME_TITLES){
            if (err) {
                res.send(err);
            }
            else {
                res.render('players/playersAdd', {'PLAYERS': result, 'GAME_TITLES': GAME_TITLES});
            }
        });
    });
});

// insert a player
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Player_Name == null) {
        res.send('Player Name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        players_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/players/all');
            }
        });
    }
});

// Delete a player for the given player_name
router.get('/delete', function(req, res){
    if(req.query.Player_Name == null) {
        res.send('Player_Name is null');
    }
    else {
        players_dal.delete(req.query.Player_Name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/players/all');
            }
        });
    }
});


router.get('/edit', function(req, res){
    if(req.query.Player_Name == null) {
        res.send('A Player_Name is required');
    }
    else {
        gametitle_dal.getAll(function(err, gametitleres){
            if(err){
                res.send(err);
            }
            else{
                players_dal.edit(req.query.Player_Name, function(err, result){
                    if(err){
                        res.send(err);
                    }
                    else {
                        console.log(result);
                        res.render('players/playersUpdate', {'PLAYERS': result[0], 'GAME_TITLES': gametitleres});
                    }
                });

            }

        });

    }

});



/*
router.get('/edit', function(req, res){
    if(req.query.Player_Name == null) {
        res.send('A Player_Name is required');
    }
    else {
        players_dal.edit(req.query.Player_Name, function(err, result){
            console.log(result);
            res.render('players/playersUpdate', {PLAYERS: result[0]});
        });
    }

});
*/

router.get('/update', function(req, res) {
    players_dal.update(req.query, function(err, result){
        res.redirect(302, '/players/all');
    });
});

module.exports = router;