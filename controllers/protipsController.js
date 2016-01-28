var Protip = require("../models/protip")
var Trip = require("../models/trip")
var User = require("../models/user")

var controller = {
  getTripProtips:function(req,res){
    Trip.findById(req.params.id,function(err,trip){
      Protip.find({'_id': {$in: trip.protips}}).then(function(protips){
        res.json(protips)
      })
    })
  },
  addTripProtip:function(req,res){
    Trip.findById(req.params.id,function(err,trip){
      var info = req.body;
      info.createdAt = new Date();
      info.userId = trip.userId;
      info.tripId = req.params.id;
      newProtip = new Protip(info)
      newProtip.save(function(err,protip){
        if(!err){
          trip.protips.push(protip._id)
          trip.save(function(err,doc){
            if(!err){
              res.json(protip)
            }
          })
        }
      })
    })
  },
  updateTripProtip:function(req,res){
    Protip.findById(req.params.id, function(err,protip){
      protip.body = req.body.body;
      protip.save(function(err){
        if(!err){
          res.json(protip)
        }
      })
    })
  },
  deleteTripProtip:function(req,res){
    Protip.remove({_id: req.params.id}, function(err){
      if(!err){
        Trip.findById(req.params.tripId, function(err, trip){
          var idx = trip.protips.indexOf(req.params.id);
          trip.protips.splice(idx,1);
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
