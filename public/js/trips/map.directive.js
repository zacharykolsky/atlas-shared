"use strict";

(function(){
  angular
  .module("trips")
  .directive("map", [
    "TripFactory",
    "$state",
    TripMapDirectiveFunction
  ]);

  function TripMapDirectiveFunction(TripFactory, $state){
    return{
      templateUrl: "js/trips/_map.html",
      scope: {
        trip: "="
      },
      link: function(scope){
        L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhc2VncnViZXIiLCJhIjoidV9tdHNYSSJ9.RRyvDLny4YwDwzPCeOJZrA';
        var map = L.mapbox.map('map', 'mapbox.streets');

        var geocoderOptions = {
          bounds: true,
          markers: false,
          layers: 'coarse',
          expanded:true
        }

        var geocoder = L.control.geocoder('search-R7-i3bQ',geocoderOptions).addTo(map);
        var geocontainer = document.getElementById("geocontainer")
        geocontainer.appendChild(geocoder.getContainer());

        geocoder.on("select", function(e){
          console.log(e)
        })

      }
    }
  }
}());
