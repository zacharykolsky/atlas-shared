var Trip = require("../models/trip")
var Location = require("../models/location")

var controller = {
  //Trip CRUD
  getTrips:function(req,res){
    Trip.find({}, function(err,docs){
      res.json(docs)
    })
  },
  getTrip:function(req,res){
    Trip.findById(req.params.id,function(err,doc){
      Location.find({'_id': {$in: doc.locations}}).then(function(locations){
        res.json(locations)
      })
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
