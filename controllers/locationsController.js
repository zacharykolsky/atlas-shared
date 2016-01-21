var Location = require("../models/location")
var Trip = require("../models/trip")

var controller = {
  //Location CRUD
  getLocations: function(req,res){
    Location.find({}, function(err,docs){
      res.json(docs)
    })
  },
  addLocation: function(req,res){
    var newLoc = new Location(req.body);
    newLoc.save(function(err){
      if (!err){
        Trip.findById(req.body.tripId, function(err,doc){
          if(!err){
            doc.locations.push(newLoc._id);
            doc.save(function(err){
              res.json(newLoc)
            })
          }
        })
      }
    })
  }
}

module.exports = controller;
