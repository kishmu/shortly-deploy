var mongoose = require('mongoose');
db = mongoose.connect('mongodb://localhost/shortlydb'); 
module.exports = db;
