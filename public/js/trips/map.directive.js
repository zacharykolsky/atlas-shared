"use strict";

(function(){
  angular
  .module("trips")
  .directive("map", [
    "TripFactory",
    "LocationFactory",
    "$state",
    "$http",
    TripMapDirectiveFunction
  ]);

  function TripMapDirectiveFunction(TripFactory, LocationFactory, $state, $http){
    return{
      templateUrl: "js/trips/_map.html",
      scope: {
        trip: "=",
        locations: "="
      },
      link: function(scope){
        L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhc2VncnViZXIiLCJhIjoidV9tdHNYSSJ9.RRyvDLny4YwDwzPCeOJZrA';
        var map = L.mapbox.map('map', 'mapbox.streets');
        map.setView([40,-85],4)

        var feats = L.featureGroup().addTo(map);

        function makePopup(place){
          var div = document.createElement("div")
          var p1 = document.createElement("p")
          p1.textContent = place.name;
          var p2 = document.createElement("p")
          p2.textContent = place.desc;
          var link = document.createElement("a")
          // link.data-ui-sref = "TripShow("+place.tripId+")"
          // link.textContent =
          div.appendChild(p1)
          div.appendChild(p2)
          return div;
        }

        if ($state.params.id){
          TripFactory.get({id:$state.params.id},function(trip){
            var baseUrl = window.location.origin;
            $http.get(baseUrl+"/trips/"+trip._id+"/locations.json").then(function(response){
              var places = response.data;
              places.forEach(function(place){
                var marker = L.marker(place.coords)
                // .setIcon(L.divIcon({
                //     className: 'marker',
                //     iconSize:[30,50],
                //     popupAnchor:[0,0]
                // }))
                  .bindPopup(makePopup(place))
                  .addTo(feats)
              })
            })

            $http.get(baseUrl+"/checkBounds?q="+trip.locale).then(function(result){
              if (result.data){
                var bounding = result.data.boundingbox;
                var sw = L.latLng(bounding[0],bounding[2]);
                var ne = L.latLng(bounding[1],bounding[3]);
                var bounds = L.latLngBounds(sw,ne);
                map.fitBounds(bounds)
              }

              var geocoderOptions = {
                bounds: bounds,
                layers: ['venue','address'],
                expanded:true,
                autocomplete:false,
                panToPoint:false
              }

              var geocoder = L.control.geocoder('search-R7-i3bQ',geocoderOptions).addTo(map);
              var geocontainer = document.querySelector(".add-container #geocontainer")
              geocontainer.appendChild(geocoder.getContainer());

              var georesults = document.getElementById("georesults");
              geocoder.on("select", function(e){
                var lat = georesults.querySelector("input[name=lat]");
                lat.value = e.latlng.lat;
                var lon = georesults.querySelector("input[name=lon]");
                lon.value = e.latlng.lng;
              })
            })
          })
        }else{
          $http.get("http://127.0.0.1:3000/locations.json").then(function(response){
            var places = response.data;
            places.forEach(function(place){
              var marker = L.marker(place.coords)
              // .setIcon(L.divIcon({
              //     className: 'marker',
              //     iconSize:[30,50],
              //     popupAnchor:[0,0]
              // }))
                .bindPopup(makePopup(place))
                .addTo(feats)
            })
            map.fitBounds(feats.getBounds())
          })
        }
      }
    }
  }
}());
