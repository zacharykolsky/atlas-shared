L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhc2VncnViZXIiLCJhIjoidV9tdHNYSSJ9.RRyvDLny4YwDwzPCeOJZrA';
var map = L.mapbox.map('map', 'mapbox.satellite');

var feats = L.featureGroup().addTo(map);
var pending = L.featureGroup().addTo(map);

map.on("click", function(evt){
  pending.clearLayers();
  var coords = [evt.latlng.lat,evt.latlng.lng];
  var popup = makeForm(coords);
  var marker = L.marker(coords, {draggable:true})
                  .bindPopup(popup)
                  .addTo(pending);
  marker.openPopup();
})

function makeForm(latlng){
  var form = document.createElement("div");
  form.className = "popup-form";
  var createdBy = document.createElement("input");
  createdBy.type = "text";
  createdBy.name = "createdBy";
  form.appendChild(createdBy);
  var desc = document.createElement("input");
  desc.type = "text";
  desc.name = "desc";
  form.appendChild(desc);
  var button = document.createElement("button")
  button.type="submit";
  button.textContent = "submit";
  button.className="popup-form-submit";
  form.appendChild(button);

  button.addEventListener("click", function(){
    var params = {
      coords: latlng,
      createdBy: createdBy.value,
      desc: desc.value
    }
    popupSubmit(params);
  })
  return form;
}

function addToFeats(point){
  var marker = L.marker(point.coords)
                  .bindPopup(point.desc)
                  .addTo(feats);
}

function getAllPoints(){
  $.getJSON("http://localhost:3000/locations.json")
    .then(function(points){
      points.forEach(function(point){
        addToFeats(point);
      })
    })
}

function addToTripList(trip){
  var trips = document.querySelector(".trips");
  var container = document.createElement("div");
  container.className = "trip";
  container.className = 'trip-container';
  container.innerHTML = trip.title+"<br>"+trip.locale+"<br>"+trip.desc;
  trips.appendChild(container);
}

function getAllTrips(){
  $.getJSON("http://localhost:3000/trips.json")
    .then(function(trips){
      trips.forEach(function(trip){
        addToTripList(trip);
      })
    })
}

function popupSubmit(params){
  return $.ajax({
    method:"post",
    data:params,
    dataType:"json",
    url:"http://localhost:3000/locations.json"
  }).then(function(data){
    addToFeats(data);
    pending.clearLayers();
  })
}

function tripSubmit(params){
  return $.ajax({
    method:"post",
    data:params,
    dataType:"json",
    url:"http://localhost:3000/trips.json"
  }).then(function(data){
    addToTripList(data);
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

$(document).ready(function(){
  getAllPoints();
  getAllTrips();
})
