var express = require("express")
var app = express();
var router = require("./config/routes");

app.use(express.static(__dirname + '/public'));
app.use(router)

app.listen(3000, function(){
  console.log("app listening on 3000")
})
