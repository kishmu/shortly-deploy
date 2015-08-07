var db = require('../config');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  username: {type: String, index: {unique: true}},
  password: String
});

var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function (err, match) {
    callback(match);
  });
};

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
  .then(function(hash) {
    this.password = hash;
    next();
  });
});

module.exports = User;
