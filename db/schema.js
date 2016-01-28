var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
mongoose.connect(process.env.MONGOLAB_URI||"mongodb://localhost/map-test");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var LocationSchema = new Schema({
  createdAt: Date,
  name: String,
  desc: String,
  tripId: String,
  userId: String,
  category: String,
  coords: Array
})

var UserSchema = mongoose.Schema({
  local : {
    email        : String,
    password     : String
  },
  facebook : {
    id: String,
    token: String,
    provider: String
  },
  name         : String,
  photo        : String,
  trips:[]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

var TripSchema = new Schema({
  createdAt: Date,
  createdBy: String,
  date: String,
  title:String,
  desc:String,
  locale:String,
  locations: [],
  userId: String
})

mongoose.model("Location", LocationSchema);
mongoose.model("Trip", TripSchema);
mongoose.model("User", UserSchema)
