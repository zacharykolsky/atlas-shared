var express = require("express")
var methodOverride = require('method-override');
var passport = require('passport');

var usersController = require('../controllers/userController');
var locationsController = require("../controllers/locationsController");
var protipsController = require("../controllers/protipsController");
var tripsController = require("../controllers/tripsController");
var Geocoder = require("node-open-geocoder");

var router = express.Router();

router.route("/")
.get(function(req,res){
  res.redirect("/login")
})

router.route('/about')
  .get(function(req,res) {res.render("about.hbs")});

//facebook auth, login/logout
router.get('/auth/validate', usersController.validateUser);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

router.route('/auth/facebook')
  .get(passport.authenticate('facebook'));

router.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/login'
  }));

router.route("/profile.:format?")
  .get(usersController.getUserProfile)

router.route("/users.json")
  .get(usersController.getAllUsers)

router.route("/users/:id.:format?")
  .get(usersController.getUserProfile)

router.route("/users/:id/friends")
  .get(usersController.getFriends);

router.route("/trips/:id.:format?")
  .get(tripsController.getTrip)
  .put(tripsController.updateTrip)
  .delete(tripsController.deleteTrip)

router.route("/trips.:format?")
  .get(tripsController.getTrips)
  .post(tripsController.addTrip)

router.route("/trips/:id/locations.:format?")
  .get(locationsController.getTripLocations)
  .post(locationsController.addTripLocation)

router.route("/trips/:tripId/locations/:id.:format?")
  .put(locationsController.updateTripLocation)
  .delete(locationsController.deleteTripLocation)

// protips
router.route("/trips/:id/protips.:format?")
  .get(protipsController.getTripProtips)
  .post(protipsController.addTripProtip)

router.route("/trips/:tripId/protips/:id.:format?")
  .put(protipsController.updateTripProtip)
  .delete(protipsController.deleteTripProtip)


router.route("/")
  .get(function(req,res){
    res.redirect("/login")
  })

router.route("/checkBounds")
  .get(function(req,res){
    var place = req.query.q;
    var geo = new Geocoder();
    geo.geocode(place, function(err,response){
      var accepted = ["administrative","city","continent","country","island"]
      var mod = response.filter(function(d){return accepted.indexOf(d.type)>-1 })
      res.json(mod[0])
    })
  })

module.exports = router;
