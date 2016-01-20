var express = require("express")
var locationsController = require("../controllers/locationsController");
var tripsController = require("../controllers/tripsController");
var router = express.Router();

router.route("/locations.json")
  .get(locationsController.getLocations)
  .post(locationsController.addLocation)

router.route("/locations/:id.json")
  .get(tripsController.getTrip)

router.route("/trips.json")
  .get(tripsController.getTrips)
  .post(tripsController.addTrip)

module.exports = router;
