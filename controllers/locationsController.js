var Location = require("../models/location")

var controller = {
  getLocations: function(req,res){
    Location.find({}, function(err,docs){
      res.json(docs)
    })
  },
  addLocation: function(req,res){
    console.log(req.body)
    var newLoc = new Location(req.body);
    newLoc.save(function(err){
      res.json(newLoc)
    })
  }
}

module.exports = controller;
