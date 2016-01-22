"use strict";

(function(){
  angular
  .module("trips")
  .controller("TripIndexController", [
    "TripFactory","$scope",
    TripIndexControllerFunction
  ]);

  function TripIndexControllerFunction(TripFactory,$scope){
    this.trips = TripFactory.query();
    this.newTrip = new TripFactory();
  }
}());
