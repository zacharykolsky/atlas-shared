var bodyParser = require("body-parser");
var hbs = require("hbs");

var express = require("express")
var router = require("./config/routes");
var app = express();

app.set('view engine', 'hbs');
app.set("views","./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(router)

app.listen(3000, function(){
  console.log("app listening on 3000")
})
