var express  = require("express");
var app      = express();
var User     = require("../models/user.js");
var Trip = require("../models/trip.js")
var Location = require("../models/location.js")
var passport = require("passport");
var request  = require("request")


// GET /signup
function getSignup(request, response) {
  response.render("signup.hbs", { message: request.flash("signupMessage") });
}

// POST /signup
function postSignup(request, response) {
  var signupStrategy = passport.authenticate("local-signup", {
    successRedirect : '/user/index',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signupStrategy(request, response);
}

// GET /login
function getLogin(request, response) {
  response.render("login.hbs", { message: request.flash("loginMessage") });
}

// POST /login
function postLogin(request, response) {
  var loginProperty = passport.authenticate("local-login", {
    successRedirect : '/user/index',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(request, response);
}

// GET /logout
function getLogout(request, response) {
  request.logout();
  response.redirect('/');
  // console.log("getLogout got called");
}

function getFriends(req,res) {
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
}

function getUserIndex(req,res){
  User.find({}).then(function(results) {
    res.json(results);
  });
}

function getUserShow(req, res){
  User.findById(req.params.id).then(function(results) {
    res.json(results);
  });
}

function getUserEdit(req, res){
  User.findById(req.params.id).then(function(results) {
    res.render("user/edit", {
      user: results
    });
  });
}

 function patchUserEdit(req,res) {
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
}

function deleteUserProfile(req,res) {
  User.findByIdAndRemove( req.params.id , function(err, user) {
    if(err){res.send(err);} else {
      res.json({success: "true"});
    }
  });
}

function validateUser(req, res) {
  var currentUser = req.user;
  if (req.user){
    res.json({isAuthenticated : "true", user: currentUser});
  } else {
    res.json({isAuthenticated : "false"});
  }
}

function getUserProfile(req,res){
  var userId = req.user._id;
  User.findById(userId, function(err,doc){
    if (!err){
      if (req.params.format){
        res.json(doc)
      }else{
        res.render("index.hbs")
      }
    }else{
      res.json(err);
    }
  })
}

module.exports = {
  getLogin:          getLogin,
  postLogin:         postLogin,
  getSignup:         getSignup,
  postSignup:        postSignup,
  getLogout:         getLogout,
  getUserIndex:      getUserIndex,
  getUserShow:       getUserShow,
  getUserEdit:       getUserEdit,
  patchUserEdit:     patchUserEdit,
  deleteUserProfile: deleteUserProfile,
  validateUser:      validateUser,
  getFriends:        getFriends,
  getUserProfile: getUserProfile
};
