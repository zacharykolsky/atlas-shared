var fs = require("fs");
var env = fs.existsSync("./env.js") ? require("./env") : process.env;

var request = require('request');
var express = require("express");
var app = express();
var flash = require("connect-flash");
var hbs = require("hbs");
var bodyParser = require("body-parser");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var methodOverride = require('method-override');

var router = require("./config/routes");

app.set('view engine', 'hbs');
app.set("views","./views");

app.use(session({ secret: 'ATLAS-SHARED' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

require('./config/passport')(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.get('/numlocs', function(req, res){
  request('http://atlas-shared.herokuapp.com/locations.json', function(err, resp){
    if (!err) {
      res.send(`Total Number of Locations: ${JSON.parse(resp.body).length}`);
    } else {
      res.send(`Error: ${err}`);
    }
  })
})

app.use(router);

var port = process.env.PORT || 3000;
app.listen(port , function(){
  console.log("app listening on "+port);
})
