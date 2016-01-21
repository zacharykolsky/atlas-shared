var express     = require("express")
var app         = express();
var passport    = require("passport");
var bodyParser  = require("body-parser");
var router      = require("./config/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(router)

app.listen(3000, function(){
  console.log("app listening on 3000")
})

require('./config/passport')(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(router);
