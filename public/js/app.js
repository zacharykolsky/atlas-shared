//initialize mapbox and map
L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhc2VncnViZXIiLCJhIjoidV9tdHNYSSJ9.RRyvDLny4YwDwzPCeOJZrA';
var map = L.mapbox.map('map', 'mapbox.satellite');

var feats = L.featureGroup().addTo(map);
var pending = L.featureGroup().addTo(map);

map.on("click", function(evt){
  pending.clearLayers();
  var coords = [evt.latlng.lat,evt.latlng.lng];
  var popup = makeForm(coords);
  var marker = L.marker(coords)
                  .bindPopup(popup)
                  .addTo(pending);
  marker.openPopup();
})

function makeForm(latlng){
  var form = document.createElement("div");
  form.className = "popup-form";
  var name = document.createElement("input");
  name.type = "text";
  name.name = "createdBy";
  form.appendChild(name);
  var desc = document.createElement("input");
  desc.type = "text";
  desc.name = "desc";
  form.appendChild(desc);
  var coords = document.createElement("input");
  coords.type = "hidden";
  coords.value = latlng.join(",");
  coords.name = "coords";
  form.appendChild(coords);
  var button = document.createElement("button")
  button.type="submit";
  button.className="popup-form-submit";
  form.appendChild(button);

  button.addEventListener("click", function(){
    var params = {
      coords: latlng,
      name: name.value,
      desc: desc.value
    }
    formSubmit(params);
  })
  return form;
}

function formSubmit(params){
  return $.ajax({
    method:"post",
    data:params,
    dataType:"json",
    url:"http://localhost:3000/locations.json"
  }).then(function(data){
    console.log(data)
  })
}
