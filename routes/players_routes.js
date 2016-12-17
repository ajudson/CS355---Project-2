var express = require('express');
var router = express.Router();
var players_dal = require('../model/players_dal');
var gametitle_dal = require('../model/gametitle_dal');
var team_dal = require('../model/team_dal');

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
    if(req.query.player_id == null) {
        res.send('player_id is null');
    }
    else {
        players_dal.getById(req.query.player_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //console.log('LENGTH IS:');
                //console.log(result.length);
                //console.log(result);

                MapStage = [result.length];
                CharacterHero = [result.length];

                for(var i=0; i < result.length; i++){
                    MapStage[i] = [result[i].MapStage, result[i].MapStage_Winrate];
                }

                for(var i=0; i < result.length; i++){
                    CharacterHero[i] = [result[i].CharacterHero, result[i].CharacterHero_Winrate];
                }

                uniq_MapStage = [];
                for(var i=0; i < MapStage.length-1; i++){
                    if (MapStage[i][0] != MapStage[i+1][0]) {
                        uniq_MapStage.push(MapStage[i]);
                    }
                }


/*
                uniq_CharacterHero = [];
                for(var i=0; i < CharacterHero.length-1; i++){
                    if (CharacterHero[i][0] != CharacterHero[i+1][0]){
                        uniq_CharacterHero.push(CharacterHero[i]);
                    }
                }
*/
/*
                var uniq_MapStage = MapStage.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });
*/
                var uniq_CharacterHero = CharacterHero.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                console.log('UNIQUE??????????????');
                console.log(uniq_MapStage);

                res.render('players/playersViewById', {'result': result[0], 'MapStage': uniq_MapStage, 'CharacterHero': uniq_CharacterHero});
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
                console.log(123);
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
    if(req.query.player_id == null) {
        res.send('player_id is null');
    }
    else {
        players_dal.delete(req.query.player_id, function(err, result){
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
    if(req.query.player_id == null) {
        res.send('A player_id is required');
    }
    else {
        gametitle_dal.getAll(function(err, gametitleres){
            if(err){
                res.send(err);
            }
            else{
                team_dal.getAll(function (err, teamres) {
                    if(err){
                        res.send(err);
                    }
                    else{
                        players_dal.edit(req.query.player_id, function(err, result){
                            if(err){
                                res.send(err);
                            }
                            else {
                                console.log(result);
                                res.render('players/playersUpdate', {'PLAYERS': result[0], 'GAME_TITLES': gametitleres, 'TEAM': teamres});
                            }
                        });
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
        else{
            players_dal.edit(req.query.Player_Name, function(err, result){
                if(err){
                    res.send(err);
                }
                else {
                    console.log(result);
                    res.render('players/playersUpdate', {'PLAYERS': result[0]});
                }
            });
        }
});
*/
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