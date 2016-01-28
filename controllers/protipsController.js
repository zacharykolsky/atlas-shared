var Protip = require("../models/protip")
var Trip = require("../models/trip")

var controller = {
  //Location CRUD
  getProtip: function(req,res){
    Protip.find({}, function(err,docs){
      res.json(docs)
    })
  },
  addProtip: function(req,res){
    var newProtip = new Protip(req.body);
    newProtip.save(function(err){
      if (!err){
        Trip.findById(req.body.tripId, function(err,doc){
          if(!err){
            doc.protips.push(newProtip._id);
            doc.save(function(err){
              res.json(newProtip)
            })
          }
        })
      }
    })
  }
