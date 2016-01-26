var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI||"mongodb://localhost/map-test");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var LocationSchema = new Schema({
  createdAt: Date,
  createdBy: String,
  name: String,
  desc: String,
  tripId: String
})

var TripSchema = new Schema({
  createdAt: Date,
  createdBy: String,
  title:String,
  desc:String,
  locale:String,
  locations: []
})

mongoose.model("Location", LocationSchema);
mongoose.model("Trip", TripSchema);
