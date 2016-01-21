//initialize mapbox and map
L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhc2VncnViZXIiLCJhIjoidV9tdHNYSSJ9.RRyvDLny4YwDwzPCeOJZrA';
var map = L.mapbox.map('map', 'mapbox.satellite');

var feats = L.featureGroup().addTo(map);
var pending = L.featureGroup().addTo(map);

map.on("click", function(evt) {
  pending.clearLayers();
  var coords = [evt.latlng.lat, evt.latlng.lng];
  var popup = makeForm(coords);
  var marker = L.marker(coords)
    .bindPopup(popup)
    .addTo(pending);
  marker.openPopup();
})

function makeForm(latlng) {
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
  button.type = "submit";
  button.className = "popup-form-submit";
  form.appendChild(button);

  button.addEventListener("click", function() {
    var params = {
      coords: latlng,
      createdBy: createdBy.value,
      desc: desc.value
    }
    formSubmit(params);
  })
  return form;
}

function addToFeats(point) {
  var marker = L.marker(point.coords)
    .bindPopup(point.desc)
    .addTo(feats);
}

function getAllPoints() {
  $.getJSON("http://localhost:3000/locations.json")
    .then(function(points) {
      points.forEach(function(point) {
        addToFeats(point);
      })
    })
}

function formSubmit(params) {
  return $.ajax({
    method: "post",
    data: params,
    dataType: "json",
    url: "http://localhost:3000/locations.json"
  }).then(function(data) {
    addToFeats(data);
    pending.clearLayers();
  })
}

$(document).ready(function() {
  getAllPoints();

  currentUser = '';
  $.getJSON('/auth/validate').then(function(json) {
    if (json.isAuthenticated === "true") {
      currentUser = json.user;
      $(".logout-btn").html("Logout " + currentUser.name);
      loadUserIndexView();
    } else {
      var background = new WelcomeView().renderBackground();
      var onboard = new WelcomeView().renderOnboard();
    }
  });
})
