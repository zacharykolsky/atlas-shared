var Trip = require("../models/trip")
var Location = require("../models/location")

var controller = {
  getTrips:function(req,res){
    Trip.find({}, function(err,docs){
      if (req.params.format){
        res.json(docs)
      }else{
        res.render("index.hbs")
      }
    })
  },
  getTrip:function(req,res){
    Trip.findById(req.params.id,function(err,doc){
      res.json(doc)
    })
  },
  addTrip:function (req,res){
    var newTrip = new Trip(req.body);
    newTrip.save(function(err){
      res.redirect("/trips/"+newTrip._id)
    })
  },
  updateTrip:function(req,res){
    Trip.findById(req.params.id, function(err, trip){
      trip.title = req.body.title;
      trip.desc = req.body.desc;
      trip.locale = req.body.locale;
      trip.save(function(err){
        if(!err){
          res.json(trip)
        }
      })
    })
  },
  deleteTrip:function(req,res){
    Trip.remove({_id: req.params.id}, function(err){
      if(!err){
        res.json({deleted:true})
      }
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
      console.log(req.body)
      var info = req.body;
      info.tripId = req.params.id;
      console.log(info)
      newLoc = new Location(info)
      // newLoc.tripId = req.params.id;
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
  }
}

module.exports = controller;
