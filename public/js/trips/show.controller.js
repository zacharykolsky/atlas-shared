"use strict";

(function(){
  angular
  .module("trips")
  .controller("TripShowController", [
    "TripFactory",
    "LocationFactory",
    "ProtipFactory",
    "ProfileFactory",
    "$stateParams",
    TripShowControllerFunction
  ]);

  function TripShowControllerFunction(TripFactory, LocationFactory, ProtipFactory, ProfileFactory, $stateParams){
    this.profile = ProfileFactory.get({});
    this.trip = TripFactory.get({id: $stateParams.id});
    this.locations = LocationFactory.query({tripId: $stateParams.id});
    this.protips = ProtipFactory.query({tripId: $stateParams.id});
    this.newLocation = new LocationFactory();
    this.newProtip = new ProtipFactory();
  }
}());
