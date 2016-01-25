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
        // console.log(scope)
        L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhc2VncnViZXIiLCJhIjoidV9tdHNYSSJ9.RRyvDLny4YwDwzPCeOJZrA';
        var map = L.mapbox.map('map', 'mapbox.streets');



      }
    }
  }
}());
