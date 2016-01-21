var express = require("express")
var locationsController = require("../controllers/locationsController");
var tripsController = require("../controllers/tripsController");
var router = express.Router();

router.route("/locations.json")
  .get(locationsController.getLocations)
  .post(locationsController.addLocation)

router.route("/trips.json")
  .get(tripsController.getTrips)
  .post(tripsController.addTrip)

router.route("/trips/:id.json")
  .get(tripsController.getTrip)

router.route("/")
  .get(function(req,res){
    res.render("index.hbs")
  })

router.route("/login")
  .get(function(req,res){
    res.render("login.hbs")
  })

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
