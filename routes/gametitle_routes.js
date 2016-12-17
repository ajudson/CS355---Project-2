var express = require('express');
var router = express.Router();
var gametitle_dal = require('../model/gametitle_dal');

//view all games
router.get('/all', function(req, res) {
    gametitle_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            console.log();
            res.render('gametitle/gametitleViewAll', { 'result':result});
        }
    });
});


//view gametitle for a given id
router.get('/', function(req, res){
    if(req.query.gametitle_id == null) {
        res.send('gametitle_id is null');
    }
    else {
        gametitle_dal.getById(req.query.gametitle_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                CharacterHero = [result.length];
                MapStage = [result.length];

                for(var i=0; i < result.length; i++){
                    CharacterHero[i] = result[i].CharacterHero;
                }

                for(var i=0; i < result.length; i++){
                    MapStage[i] = result[i].MapStage;
                }

                var uniq_CharacterHero = CharacterHero.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });

                var uniq_MapStage = MapStage.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.log(CharacterHero);
                res.render('gametitle/gametitleViewById', {'result': result, 'CharacterHero': uniq_CharacterHero, 'MapStage': uniq_MapStage});
            }
        });
    }
});

//add a gametitle
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    gametitle_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('gametitle/gametitleAdd', {'GAME_TITLES': result});
        }
    });
});

// insert a game title
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Game_Title == null) {
        res.send('Game Title must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        gametitle_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/gametitle/all');
            }
        });
    }
});

// Delete a gametitle for the given game_title
router.get('/delete', function(req, res){
    if(req.query.gametitle_id == null) {
        res.send('gametitle_id is null');
    }
    else {
        gametitle_dal.delete(req.query.gametitle_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/gametitle/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.Game_Title == null) {
        res.send('A Game_Title is required');
    }
    else {
        gametitle_dal.edit(req.query.Game_Title, function(err, result){
            console.log(result);
            res.render('gametitle/gametitleUpdate', {GAME_TITLES: result[0]});
        });
    }

});

router.get('/update', function(req, res) {
    gametitle_dal.update(req.query, function(err, result){
        res.redirect(302, '/gametitle/all');
    });
});

module.exports = router;