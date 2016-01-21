var Location = require("../models/location")
var Trip = require("../models/trip")

// var geocoder = require("search-osm-geocode")
// geocoder.geocode("Washington, D.C.", function(err,result){
//   if (err) {console.log(err)}
//   console.log(result)
// })
// 
// var geocoderProvider = 'opencage';
// var httpAdapter = 'http';
// // optionnal
// var extra = {
//     apiKey: '8e4bf5594bb6317b4fc2dac165fa2fd3', // for Mapquest, OpenCage, Google Premier
//     formatter: null         // 'gpx', 'string', ...
// };
//
// var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);
//
// // Using callback
// geocoder.geocode('Open City, Washington, D.C., USA', function(err, res) {
//     console.log(res);
// });

var controller = {
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
            doc.places.push(newLoc._id);
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
