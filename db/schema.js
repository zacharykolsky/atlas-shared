var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/map-test");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var LocationSchema = new Schema({
  createdAt: Date,
  createdBy: String,
  coords: Array,
  desc: String
})

mongoose.model("Location", LocationSchema);
