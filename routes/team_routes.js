var express = require('express');
var router = express.Router();
var team_dal = require('../model/team_dal');


//view all teams
router.get('/all', function(req, res) {
    team_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }
        else{
            console.log();
            res.render('team/teamViewAll', {'result': result});
        }
    });
});


//view team for a given id
router.get('/', function(req, res){
    if(req.query.Team_Name == null) {
        res.send('Team_Name is null');
    }
    else {
        team_dal.getById(req.query.Team_Name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('team/teamViewById', {'result': result});
            }
        });
    }
});

//add a team
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    team_dal.getAll(function(err,result) {
        if(err){
            res.send(err);
        }
        else{
            res.render('team/teamAdd', {'team': result});
        }
    });
});

// insert a team
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Team_Name == null) {
        res.send('Team Name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        team_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/team/all');
            }
        });
    }
});

// Delete a team for the given team_name
router.get('/delete', function(req, res){
    if(req.query.Team_Name == null) {
        res.send('Team_Name is null');
    }
    else {
        team_dal.delete(req.query.Team_Name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/team/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.Team_Name == null) {
        res.send('A Team Name is required');
    }
    else {
        team_dal.edit(req.query.Team_Name, function(err, result){
            res.render('team/teamUpdate', {TEAM: result[0]});
        });
    }
});

router.get('/update', function(req, res) {
    team_dal.update(req.query, function(err, result){
        res.redirect(302, '/team/all');
    });
});

module.exports = router;