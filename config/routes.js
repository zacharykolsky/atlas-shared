var express = require("express")
var methodOverride      = require('method-override');
var passport            = require('passport');

var usersController     = require('../controllers/userController');
var locationsController = require("../controllers/locationsController");
var tripsController = require("../controllers/tripsController");

var request = require("request")

var router = express.Router();

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
      successRedirect: '/profile',
      failureRedirect: '/login'
  }));

router.get("/user/index.:format?", usersController.getUserIndex);

router.route("/profile.:format?")
  .get(usersController.getUserProfile)

router.route("/users/:id/trips")
  .get(tripsController.getUsersTrips)


router.get("/user/:id.:format?", usersController.getUserShow);
router.delete("/user/:id", usersController.deleteUserProfile);
router.patch("/user/:id", usersController.patchUserEdit);
router.get("/user/:id/edit", usersController.getUserEdit);

router.route("/users.:format?")
  .get(usersController.getUserIndex)

router.route("/user/:id/friends")
  .get(usersController.getFriends);

router.route("/trips.:format?")
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
