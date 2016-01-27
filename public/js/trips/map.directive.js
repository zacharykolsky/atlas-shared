"use strict";

(function(){
  angular
  .module("trips")
  .directive("map", [
    "TripFactory",
    "$state",
    "$http",
    TripMapDirectiveFunction
  ]);

  function TripMapDirectiveFunction(TripFactory, $state, $http){
    return{
      templateUrl: "js/trips/_map.html",
      scope: {
        trip: "="
      },
      link: function(scope){
        L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhc2VncnViZXIiLCJhIjoidV9tdHNYSSJ9.RRyvDLny4YwDwzPCeOJZrA';
        var map = L.mapbox.map('map', 'mapbox.streets');

        TripFactory.get({id:$state.params.id},function(trip){
          $http.get("http://127.0.0.1:3000/checkBounds?q="+trip.locale).then(function(result){

            var bounding = result.data.boundingbox;
            var sw = L.latLng(bounding[0],bounding[2]);
            var ne = L.latLng(bounding[1],bounding[3]);
            var bounds = L.latLngBounds(sw,ne);
            map.fitBounds(bounds)

            var geocoderOptions = {
              bounds: bounds,
              layers: ['venue','address'],
              expanded:true,
              autocomplete:false,
              panToPoint:false
            }

            var geocoder = L.control.geocoder('search-R7-i3bQ',geocoderOptions).addTo(map);

            var geocontainer = document.getElementById("geocontainer")
            geocontainer.appendChild(geocoder.getContainer());

            geocoder.on("select", function(e){
              var lat = geocontainer.querySelector("input[name=lat]");
              lat.value = e.latlng.lat;
              var lon = geocontainer.querySelector("input[name=lon]");
              lon.value = e.latlng.lng;
            })
          })
        })
      }
    }
  }
}());
