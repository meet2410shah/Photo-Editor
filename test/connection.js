const mongoose = require('mongoose');

//Connect to Mongodb
mongoose.connect('mongodb://localhost/testaroo');

mongoose.connection.once('open', function() {
    console.log('Connection has been made, now make fireworks');
}).on('error', function(error){
    console.log('Connection Error :'.error);
});