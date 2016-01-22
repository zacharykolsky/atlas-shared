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

      }
    }
  }
}());
