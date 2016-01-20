var Trip = require("../models/trip")

var controller = {
  getTrips:function(req,res){
    Trip.find({}, function(err,docs){
      res.json(docs)
    })
  },
  addTrip:function (req,res){
    var newTrip = new Trip(req.body);
    newTrip.save(function(err){
      res.json(newTrip)
    })
  }
}

module.exports = controller;
