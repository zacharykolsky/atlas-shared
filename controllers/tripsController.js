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
      // Location.find({'_id': {$in: doc.locations}}).then(function(locations){
        res.json(doc)
      // })
    })
  },
  addTrip:function (req,res){
    var newTrip = new Trip(req.body);
    newTrip.save(function(err){
      res.redirect("/trips/"+newTrip._id)
      // res.render("show.hbs",{trip:newTrip})
      // res.json(newTrip)
    })
  },
  updateTrip:function(req,res){

  },
  deleteTrip:function(req,res){
    Trip.remove({_id: req.params.id}, function(err){
      if(!err){
        // res.redirect("/trips")
        res.json({deleted:true})
      }
    })
  }
}

module.exports = controller;
