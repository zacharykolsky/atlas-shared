var FacebookStrategy  = require("passport-facebook").Strategy;
// var LocalStrategy     = require("passport-local").Strategy;
var User              = require("../models/user");
process.env           = require("../env");

module.exports = function(passport) {

  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  // Facebook login
  passport.use('facebook', new FacebookStrategy({
    // Here we reference the values in process.process.env.js.
    clientID: process.env.facebookID,
    clientSecret: process.env.facebookSecret,
    callbackURL: process.env.facebookCallbackURL,
    profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'bio']
  }, function(token, secret, profile, done) {
    process.nextTick(function(){
      User.findOne({'facebook.id': profile.id}, function(err, user) {
        if(err) return done(err);

        // If the user already exists, just return that user.
        if(user){
          return done(null, user);
        } else {
          // Otherwise, create a brand new user using information passed from Twitter.
          var newUser = new User();

          // Here we're saving information passed to us from Facebook.
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.name = profile.displayName;
          newUser.photo = profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg';
          newUser.facebook.provider = profile.provider;
          newUser.bio = profile.bio;
          // would it be possible to save the user's email(s) from FB here too?
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
