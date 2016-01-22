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


/*
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
*/



}

module.exports = controller;
