"use strict";

(function(){
  angular
  .module("trips")
  .controller("TripShowController", [
    "TripFactory",
    "LocationFactory",
    "$stateParams",
    TripShowControllerFunction
  ]);

  function TripShowControllerFunction(TripFactory, LocationFactory, $stateParams){
    this.trip = TripFactory.get({id: $stateParams.id});
    this.locations = LocationFactory.query({tripId: $stateParams.id});
  }
}());
