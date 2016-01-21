function tripSubmit(params){
  return $.ajax({
    method:"post",
    data:params,
    dataType:"json",
    url:"http://localhost:3000/trips.json"
  }).then(function(data){
    // addToTripList(data);
    $(".trip-form input").val("");
  })
}

$(".trip-form button").on("click", function(){
  var params = {
    locale: $(".trip-form input[name=locale]").val(),
    title: $(".trip-form input[name=title]").val(),
    desc: $(".trip-form input[name=desc]").val()
  }
  tripSubmit(params);
})
