var express = require("express")
var locationsController = require("../controllers/locationsController");
var router = express.Router();

router.route("/locations.json")
  .get(locationsController.getLocations)
  .post(locationsController.addLocation)

module.exports = router;
