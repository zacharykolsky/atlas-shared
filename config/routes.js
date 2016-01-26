var express = require("express")
var locationsController = require("../controllers/locationsController");
var tripsController = require("../controllers/tripsController");

var request = require("request")

var router = express.Router();

// router.route("/locations.:format?")
//   .get(locationsController.getLocations)
//   .post(locationsController.addLocation)
//
// router.route("/locations/:id.:format?")
//   .get(locationsController.getLocation)
//   .put(locationsController.updateLocation)
//   .delete(locationsController.deleteLocation)

router.route("/trips.:format?")
  .get(tripsController.getTrips)
  .post(tripsController.addTrip)

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
    res.redirect("/trips")
  })

router.route("/checkPlace")
  .get(function(req,res){
    var place = req.query.q;
    var url =  "http://api.opencagedata.com/geocode/v1/json?query="+place+"&key=8e4bf5594bb6317b4fc2dac165fa2fd3";

    var requestParams = {
      method:"GET",
      json:true,
      url:url
    }
    request(requestParams,function(err,response,body){
      if (!err){
       res.json(body.results[0])
      }else{
        res.json({no:"results"})
      }
    })
  })

router.route("/login")
  .get(function(req,res){
    res.render("login.hbs")
  })

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
