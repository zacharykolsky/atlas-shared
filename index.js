var express = require("express")
var app = express();

app.get("/", function(req,res){
  console.log("slash route requested")
  res.send("HELLOWOWOW")
})

app.listen(3000, function(){
  console.log("app listening on 3000")
})
