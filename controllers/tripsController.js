var Trip = require("../models/trip")
var Location = require("../models/location")
var User = require("../models/user")

var controller = {
  getTrips:function(req,res){
    var userId = req.user._id;
    Trip.find({'userId':userId}, function(err,docs){
      if (req.params.format){
        res.json(docs)
      }else{
        res.render("index.hbs")
      }
    })
  },
  getUsersTrips:function(req,res){
    var userId = req.params.id;
    Trip.find({'userId':userId}, function(err,docs){
      if (req.params.format){
        res.json(docs)
      }else{
        res.json({not:"json"})
      }
    })
  },
  getTrip:function(req,res){
    Trip.findById(req.params.id,function(err,doc){
      res.json(doc)
    })
  },
  addTrip:function (req,res){
    User.findById(req.user._id, function(err, user){
      if (!err){
        var info = req.body;
        info.userId = user._id;
        var newTrip = new Trip(info)
        newTrip.save(function(err){
          if (!err){
            user.trips.push(newTrip._id);
            user.save(function(err){
              if (!err){
                res.redirect("/trips/"+newTrip._id)
              }
            })
          }
        })
      }
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
    Trip.findById(req.params.id, function(err, trip){
      Location.remove({'_id': {$in: trip.locations}}).then(function(){
        trip.remove(function(err){
          if(!err){
            res.json({deleted:true})
          }
        })
      })
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
