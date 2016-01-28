"use strict";

(function(){
  angular
  .module("trips")
  .controller("TripIndexController", [
    "TripFactory",
    "$http",
    TripIndexControllerFunction
  ]);

  function TripIndexControllerFunction(TripFactory,$http){
    this.trips = TripFactory.query();
  }
}());
