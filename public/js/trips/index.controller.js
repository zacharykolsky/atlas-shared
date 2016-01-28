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
    this.trips = TripFactory.query();//$http.get("http://127.0.0.1:3000/trips/all.json")
  }
}());
