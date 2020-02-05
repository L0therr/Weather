var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    name: String,
    state: String,
    tempMin: Number,
    tempMax: Number,
    ico: String,
    lat: Number,
    lon: Number
});

var cityModel = mongoose.model('cities', citySchema);

module.exports = cityModel;

console.log('====== citiesModel export done =======')