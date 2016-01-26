var User = require("../db/schema");
var mongoose = require("mongoose");

var UserModel = mongoose.model("User");
module.exports = UserModel;
// var mongoose = require('mongoose');
//
//
// // Nice schema!
// var User = mongoose.Schema({
//   local : {
//     email        : String,
//     password     : String
//   },
//   facebook : {
//     id: String,
//     token: String,
//     provider: String
//   },
//   name         : String,
//   photo        : String,
// });
//
// User.methods.encrypt = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
//
// User.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
// };
//
// module.exports = mongoose.model('User', User);
