var express = require('express');
var router = express.Router();
var tournaments_dal = require('../model/tournaments_dal');
var team_dal = require('../model/team_dal');

//view all tournaments
router.get('/all', function(req, res) {
    tournaments_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.render('tournaments/tournamentsViewAll', {'result': result});
        }
    });
});


//view tournaments for a given id
router.get('/', function(req, res){
    if(req.query.tournament_id == null) {
        res.send('tournament_id is null');
    }
    else {
        tournaments_dal.getById(req.query.tournament_id, function(err,result) {
            if (err) {
                console.log(1);
                res.send(err);
            }
            else {
                console.log(2);
                res.render('tournaments/tournamentsViewById', {'result': result});
            }
        });
    }
});

//add a tournament
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    tournaments_dal.getAll(function(err,result) {
        team_dal.getAll(function(err,team){
            if(err){
                res.send(err);
            }
            else{
                res.render('tournaments/tournamentsAdd', {'tournaments': result, 'team': team});
            }
        });

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
        team_dal.getAll(function (err, teamres){
           if (err){
               res.send(err);
           }
           else{
               tournaments_dal.edit(req.query.Tournament_Name, function(err, result){
                   if(err){
                       res.send(err);
                   }
                   else{
                       var team = [teamres.length];

                       for (var i = 0; i < teamres.length; i++) {
                           team[i] = teamres[i].team_name;
                       }
                        var uniqteam = team.filter(function(elem, index, self){
                            return index == self.indexOf(elem);
                        });

                       uniqvalues = {'team': uniqteam};
                       console.log('UNIQZ');
                       console.log(uniqvalues);
                       res.render('tournaments/tournamentsUpdate', {TOURNAMENTS: result[0], 'team': teamres});

                   }
               });
           }
        });
    }
});

router.get('/update', function(req, res) {
    tournaments_dal.update(req.query, function(err, result){
        res.redirect(302, '/tournaments/all');
    });
});

module.exports = router;