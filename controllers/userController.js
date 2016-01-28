var express  = require("express");
var app      = express();
var User     = require("../models/user.js");
var Trip = require("../models/trip.js")
var Location = require("../models/location.js")
var passport = require("passport");
var request  = require("request")

var controller = {
  // GET /signup
  getSignup: function(request, response) {
    response.render("signup.hbs", { message: request.flash("signupMessage") });
  },
  // POST /signup
  postSignup: function(request, response) {
    var signupStrategy = passport.authenticate("local-signup", {
      successRedirect : '/user/index',
      failureRedirect : '/signup',
      failureFlash : true
    });
    return signupStrategy(request, response);
  },
  // GET /login
  getLogin: function(request, response) {
    response.render("login.hbs", { message: request.flash("loginMessage") });
  },
  // POST /login
  postLogin: function(request, response) {
    var loginProperty = passport.authenticate("local-login", {
      successRedirect : '/user/index',
      failureRedirect : '/login',
      failureFlash : true
    });
    return loginProperty(request, response);
  },
  // GET /logout
  getLogout: function(request, response) {
    request.logout();
    response.redirect('/login');
  },
  getFriends: function(req,res) {
    var url           = '',
        requestParams = {};

    User.findById(req.params.id).then(function(results) {
      var fbId = results.facebook.id;
      var fbToken = results.facebook.token;
      // console.log(results);

      var url = "https://graph.facebook.com/v2.5/"+ fbId +"?fields=context.fields(mutual_friends)&access_token="+fbToken;
      var requestParams = {
        method: "GET",
        json: true,
        url: url
      };
      console.log(requestParams);

      request(requestParams,function(err,response,body){
        if (!err){
          res.json(body);
        //  res.json(body.results[0]);
        }else{
          res.json({no:"results"});
        }
      });
    });
  },
  getUserIndex: function(req,res){
    User.find({}).then(function(results) {
      res.json(results);
    });
  },
  getUserShow: function(req, res){
    User.findById(req.params.id).then(function(results) {
      res.json(results);
    });
  },
  getUserEdit: function(req, res){
    User.findById(req.params.id).then(function(results) {
      res.render("user/edit", {
        user: results
      });
    });
  },
  patchUserEdit: function(req,res) {
   User.findByIdAndUpdate(req.params.id, {
     name: req.body.name,
     location: req.body.location,
     interests: req.body.interests,
     photo: req.body.photo,
     bio: req.body.bio,
     local: {
       email: req.body.local.email,
       password: req.body.local.password
     }
   }, {new: true}).then(function(user) {
     console.log(user);
     res.json(user);
   });
  },
  deleteUserProfile: function(req,res) {
   User.findByIdAndRemove( req.params.id , function(err, user) {
     if(err){res.send(err);} else {
       res.json({success: "true"});
     }
   });
  },
  validateUser: function(req, res) {
    var currentUser = req.user;
    if (req.user){
      res.json({isAuthenticated : "true", user: currentUser});
    } else {
      res.json({isAuthenticated : "false"});
    }
  },
  getUserProfile: function(req,res){
    var userId = (req.params.id)?req.params.id:req.user._id;
    User.findById(userId, function(err,user){
      if (!err){
        Trip.find({'userId':userId}, function(err,trips){
          if (req.params.format){
            user.trips = trips;
            res.json(user)
          }else{
            res.render("index.hbs")
          }
        })
      }else{
        res.json(err);
      }
    })
  },
  getAllUsers: function(req,res){
    User.find({},function(err,users){
      if(!err){
        res.json(users)
      }
    })
  }
}
module.exports = controller;
