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
      if (req.params.format){
        res.json(doc)
      }else{
        res.render("index.hbs")
      }
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
  }
}

module.exports = controller;
