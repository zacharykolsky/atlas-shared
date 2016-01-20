var Trip = require("../db/schema");
var mongoose = require("mongoose");

var TripModel = mongoose.model("Trip");
module.exports = TripModel;
