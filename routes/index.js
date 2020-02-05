var express = require('express');
var router = express.Router();
var request = require('sync-request');
var mongoose = require('mongoose');
var session = require('express-session');

//models
var cityModel = require('../models/cities');
var signupModel = require('../models/signup');

//end of export

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/weather');
});

router.get('/login', (req, res, next) => {
    req.session.error = {
        alreadyCity: false,
        signin: false,
        signup: false
    }
    res.render('login', { title: 'loginPage', session: req.session });
});

router.get('/weather', async(req, res, next) => {
    var cityList = await cityModel.find();
    res.render('weather', { title: 'weather', cityList, session: req.session });
});

// GET SEARCH
router.post('/addcity', async function(req, res, next) {
    var search = req.body.inputSearch;

    console.log(`====== search is: ${search} ======`)

    //weather API
    var getApiData = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=1af40241b6471b9d3803a04b16e701db`);
    if (getApiData.statusCode <= 300 && search[0] != ',') {

        console.log(`====== "${search}" is a valide city name ======`)
        getApiData = JSON.parse(getApiData.getBody());

        //get weather API valuess
        var cityName = getApiData.name.toLowerCase();
        var min = getApiData.main.temp_min;
        var max = getApiData.main.temp_max;
        var sta = getApiData.weather[0].main;
        var lat = getApiData.coord.lat;
        var lon = getApiData.coord.lon;
        var ico = getApiData.weather[0].icon;
        var ID = getApiData.id;

        //check already exist
        var alreadyExist = await cityModel.findOne({
            name: search.toLowerCase(),
        });

        //create a new city
        if (alreadyExist === null) {
            var newCity = new cityModel({
                name: cityName,
                state: sta,
                tempMin: min,
                tempMax: max,
                ico: `http://openweathermap.org/img/wn/${ico}@2x.png`,
                lat: lat,
                lon: lon,
            })
            await newCity.save();
        } else { req.session.error.alreadyCity = true; }
        cityList = await cityModel.find();
    }

    res.render('weather', { cityList, session: req.session });
});

// REMOVE CITY
router.get('/rmvcity', async(req, res, next) => {
    await cityModel.deleteOne({
        _id: req.query.id,
    })
    res.redirect('/weather');
});

//update infos;
router.get('/update', async(req, res, next) => {
    var cityList = await cityModel.find();

    for (var i = 0; i < cityList.length; i++) {
        var getApiData = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&APPID=1af40241b6471b9d3803a04b16e701db`);
        getApiData = JSON.parse(getApiData.getBody());

        await cityModel.updateOne({
            _id: cityList[i].id
        }, {
            name: getApiData.name.toLowerCase(),
            state: getApiData.weather[0].main,
            tempMin: getApiData.main.temp_min,
            tempMax: getApiData.main.temp_max,
            ico: `http://openweathermap.org/img/wn/${getApiData.weather[0].icon}@2x.png`,
            url: `https://www.google.com/maps/search/${getApiData.coord.lat},${getApiData.coord.lon}`,
        })
    }

    var cityList = await cityModel.find();
    res.render('weather', { cityList, session: req.session.currentUser });
    console.log('====== update okay ======')
    console.log('====== NEW DATA: ' + cityList + ' ========');
});

module.exports = router;