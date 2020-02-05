var mongoose = require('mongoose');

var signUpSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cityId: [String],
});

var signupModel = mongoose.model('users', signUpSchema);

module.exports = signupModel;
console.log('====== signupModel export done =======')