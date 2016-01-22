var Trip = require("../models/trip")

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
  }
}

module.exports = controller;
