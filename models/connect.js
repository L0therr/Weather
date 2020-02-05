var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://admin:guvO7G5z6ZLB3Mgz@cluster0-k0fxq.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
    options,
    function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log('====== signupModel export done =======');
            console.log('=========== DB connect ok ============');
        }
    }
);

module.exports = mongoose;