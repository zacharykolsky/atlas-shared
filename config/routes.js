var express = require("express")
var methodOverride = require('method-override');
var passport = require('passport');

var usersController = require('../controllers/userController');
var locationsController = require("../controllers/locationsController");
var tripsController = require("../controllers/tripsController");

var request = require("request")

var router = express.Router();

//facebook auth
router.get('/auth/validate', usersController.validateUser);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

// Facebook login
router.route('/auth/facebook')
  .get(passport.authenticate('facebook'));

router.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/login'
  }));

router.route("/profile.:format?")
  .get(usersController.getUserProfile)

router.route("/users/:id")
  .get(usersController.getUserProfile)
  // .get(tripsController.getUsersTrips)


router.get("/user/:id.:format?", usersController.getUserShow);
router.delete("/user/:id", usersController.deleteUserProfile);
router.patch("/user/:id", usersController.patchUserEdit);
router.get("/user/:id/edit", usersController.getUserEdit);

router.route("/users.:format?")
  .get(usersController.getUserIndex)

router.route("/user/:id/friends")
  .get(usersController.getFriends);

router.route("/users/:id/trips.:format?")
  .get(tripsController.getTrips)
  .post(tripsController.addTrip);

router.route("/trips/:id.:format?")
  .get(tripsController.getTrip)
  .put(tripsController.updateTrip)
  .delete(tripsController.deleteTrip)

router.route("/trips/:id/locations.:format?")
  .get(tripsController.getTripLocations)
  .post(tripsController.addTripLocation)

router.route("/trips/:tripId/locations/:id.:format?")
  .put(tripsController.updateTripLocation)
  .delete(tripsController.deleteTripLocation)

router.route("/")
  .get(function(req,res){
    res.redirect("/login")
  })

router.route("/checkPlace")
  .get(function(req,res){
    var place = req.query.q;
    var url =  "http://api.opencagedata.com/geocode/v1/json?query="+place+"&key=8e4bf5594bb6317b4fc2dac165fa2fd3";

    var requestParams = {
      method:"GET",
      json:true,
      url:url
    };
    request(requestParams,function(err,response,body){
      if (!err){
       res.json(body.results[0]);
      }else{
        res.json({no:"results"});
      }
    });
  });

module.exports = router;


/*
routes we need:
--user login/logout--
/login
/logout
/signup
/auth/validate
/auth/Facebook
/auth/facebook/callback

/profile -- get profile of currentUser
/user/:userId -- get profile of another user, user show
/user/:userId/trips/:id -- get a trip



*/
