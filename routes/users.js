var express = require('express');
var router = express.Router();
var request = require('sync-request');
var mongoose = require('mongoose');
var session = require('express-session');

//models
var cityModel = require('../models/cities');
var signupModel = require('../models/signup');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/login');
});


//SIGN UP
router.post('/sign-up', async(req, res, next) => {
    //get all data
    var name = req.body.username;
    var mail = req.body.email.toLowerCase();
    var pswd = req.body.password;

    //check if email already used
    var alreadySigned = await signupModel.findOne({
        email: mail,
    });

    //register the user
    if (alreadySigned === null) {
        var newUser = new signupModel({
            username: name,
            email: mail,
            password: pswd,
            cityId: [56, 78, ],
        })
        await newUser.save();
        logged = true;
        req.session.currentUser = newUser;
        req.session.isLogged = true;
    } else {
        req.session.error.signup = true;
    }
    res.redirect('/weather');
});


//login
router.post('/sign-in', async(req, res, next) => {
    var mail = req.body.email.toLowerCase();
    var pswd = req.body.password;

    var isExist = await signupModel.findOne({
        email: mail,
        password: pswd,
    });

    if (isExist) {
        req.session.currentUser = isExist;
        req.session.isLogged = true;
        res.redirect('/weather');
        console.log(`========== login with ${req.session.currentUser.username} ========`)
    } else {
        console.log('Wrong Credentials')
        error.signin = true;
        res.redirect('/login');
    }
});


//disconnect
router.get("/signout", async function(req, res) {
    console.log(req.session);
    req.session.isLogged = false;
    console.log(req.session)
    res.render('login', { title: 'loginPage' });
});

module.exports = router;