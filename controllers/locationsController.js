var Trip = require("../models/trip")
var Location = require("../models/location")
var User = require("../models/user")

var controller = {
  getAllLocations: function(req,res){
    Location.find({}, function(err,locations){
      res.json(locations)
    })
  },
  getTripLocations:function(req,res){
    Trip.findById(req.params.id,function(err,trip){
      Location.find({'_id': {$in: trip.locations}}).then(function(places){
        res.json(places)
      })
    })
  },
  addTripLocation:function(req,res){
    Trip.findById(req.params.id,function(err,trip){
      var info = req.body;
      info.createdAt = new Date();
      info.userId = trip.userId;
      info.tripId = req.params.id;
      newLoc = new Location(info)
      newLoc.save(function(err,loc){
        if(!err){
          trip.locations.push(loc._id)
          trip.save(function(err,doc){
            if(!err){
              res.json(loc)
            }
          })
        }
      })
    })
  },
  updateTripLocation:function(req,res){
    Location.findById(req.params.id, function(err,loc){
      loc.category = req.body.category;
      loc.coords = req.body.coords;
      loc.name = req.body.name;
      loc.desc = req.body.desc;
      loc.save(function(err){
        if(!err){
          res.json(loc)
        }
      })
    })
  },
  deleteTripLocation:function(req,res){
    Location.remove({_id: req.params.id}, function(err){
      if(!err){
        Trip.findById(req.params.tripId, function(err, trip){
          var idx = trip.locations.indexOf(req.params.id);
          trip.locations.splice(idx,1);
          trip.save(function(err, doc){
            if (!err){
              res.json({deleted: true})
            }
          })
        })
      }
    })
  }
}

module.exports = controller;
