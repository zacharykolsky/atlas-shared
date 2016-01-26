var fs = require("fs");
var env = fs.existsSync("./env.js") ? require("./env") : process.env;

var express        = require("express");
var app            = express();
var flash          = require("connect-flash");
var hbs            = require("hbs");
var bodyParser     = require("body-parser");
var passport       = require("passport");
var cookieParser   = require("cookie-parser");
var session        = require("express-session");
var methodOverride = require('method-override');

var router         = require("./config/routes");

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

app.use(router);

app.listen(3000, function(){
  console.log("app listening on 3000");
});
