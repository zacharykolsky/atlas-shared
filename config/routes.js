var express = require("express")
var methodOverride      = require('method-override');
var passport            = require('passport');

var usersController     = require('../controllers/userController');
var locationsController = require("../controllers/locationsController");
var tripsController = require("../controllers/tripsController");

var request = require("request")

var router = express.Router();

// http://api.opencagedata.com/geocode/v1/json?query=peru&key=8e4bf5594bb6317b4fc2dac165fa2fd3

// var geocoderProvider = 'opencage';
// var httpAdapter = 'http';
// // optionnal
// var extra = {
//     apiKey: '8e4bf5594bb6317b4fc2dac165fa2fd3', // for Mapquest, OpenCage, Google Premier
//     formatter: null         // 'gpx', 'string', ...
// };
//
// var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);
//
// // Using callback
// geocoder.geocode(place, function(err, res) {
//     console.log(res);
// });


router.route("/locations.json")
  .get(locationsController.getLocations)
  .post(locationsController.addLocation);

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
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.get("/user/index.:format?", usersController.getUserIndex);
router.get("/user/:id.:format?", usersController.getUserShow);
router.delete("/user/:id", usersController.deleteUserProfile);
router.patch("/user/:id", usersController.patchUserEdit);
router.get("/user/:id/edit", usersController.getUserEdit);


router.route("/trips.json")
  .get(tripsController.getTrips)
  .post(tripsController.addTrip);

router.route("/trips/:id.json")
  .get(tripsController.getTrip);

router.route("/")
  .get(function(req,res){
    res.render("show.hbs");
  });

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

router.route("/login")
  .get(function(req,res){
    res.render("login.hbs");
  });

router.route("/trips/:id")
  .get(function(req,res){
    res.render("show.hbs");
  });
  // .get(tripsController.getTrip)
  // .post(tripsController.addTrip)

//router.route("/logout")
//router.route("/auth/facebook")

// router.route("/trips/:id.json")
//   .get(tripsController.showTrip)
//   .put(tripsController.updateTrip)
//   .delete(tripsController.destroyTrip)

// router.route("/trips/:id/locations.json")
//   .get(locationsController.getTripLocations)
//   .post(locationsController.addTripLocation)

// router.route("/trips/:trip_id/locations/:id.json")
//   .get(locationsController.getLocation)
//   .put(locationsController.updateLocation)
//   .delete(locationsController.destroyLocation)

// router.route("/login")


//Upn logging in:
//View your trips, view your friends trips, create a new trip
// ^^ this is where you click to view/edit/delete your trips
//Trip show: this is where you add locations and protips


//____SHARE YOUR EXPERIENCE___
// user should be able to create a trip
// user should be able to edit/delete a trip
// user should be able to add points to a trip
// user should be able to edit/delete points from a trip
// user should be able to add protip to a trip
// user should be able to edit/delete protip
//____VIEW YOUR FRIENDS EXPERIENCES____
// user should be able to filter points by geography/type/review/person


module.exports = router;
