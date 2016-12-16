var express = require('express');
var router = express.Router();
var tournaments_dal = require('../model/tournaments_dal');


//view all tournaments
router.get('/all', function(req, res) {
    tournaments_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            console.log();
            res.render('tournaments/tournamentsViewAll', {'result': result});
        }
    });
});


//view tournaments for a given id
router.get('/', function(req, res){
    if(req.query.Tournament_Name == null) {
        res.send('Tournament_Name is null');
    }
    else {
        tournaments_dal.getById(req.query.Tournament_Name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                console.log(result);
                res.render('tournaments/tournamentsViewById', {'result': result});
            }
        });
    }
});

//add a tournament
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    tournaments_dal.getAll(function(err,result) {
        if(err){
            res.send(err);
        }
        else{
            res.render('tournaments/tournamentsAdd', {'tournaments': result});
        }
    });
});

// insert a tournament
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Tournament_Name == null) {
        res.send('Tournament Name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        tournaments_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/tournaments/all');
            }
        });
    }
});

// Delete a tournament for the given tournament_name
router.get('/delete', function(req, res){
    if(req.query.Tournament_Name == null) {
        res.send('Tournament_Name is null');
    }
    else {
        tournaments_dal.delete(req.query.Tournament_Name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/tournaments/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.Tournament_Name == null) {
        res.send('A Tournament Name is required');
    }
    else {
        tournaments_dal.edit(req.query.Tournament_Name, function(err, result){
            res.render('tournaments/tournamentsUpdate', {TOURNAMENTS: result[0]});
        });
    }
});

router.get('/update', function(req, res) {
    tournaments_dal.update(req.query, function(err, result){
        res.redirect(302, '/tournaments/all');
    });
});

module.exports = router;