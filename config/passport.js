var FacebookStrategy  = require("passport-facebook").Strategy;
var LocalStrategy     = require("passport-local").Strategy;
var User              = require("../models/user");
var fs = require("fs");
var env = fs.existsSync("./env.js") ? require("../env") : process.env;

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
    clientID: env.facebookID,
    clientSecret: env.facebookSecret,
    callbackURL: env.facebookCallbackURL,
    profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'bio']
  }, function(token, secret, profile, done) {
    process.nextTick(function(){
      User.findOne({'facebook.id': profile.id}, function(err, user) {
        if(err) return done(err);

        if(user){
          user.facebook.token = token;
          user.photo = profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg';
          user.save(function(err){
            if(err) throw err;
            return done(null, user);
          });
          // return done(null, user);
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
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
