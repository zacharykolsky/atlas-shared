"use strict";

(function(){
  angular
  .module("users")
  .controller("UserShowController", [
    "TripFactory",
    "LocationFactory",
    "UserFactory",
    "$stateParams",
    TripShowControllerFunction
  ]);

  function TripShowControllerFunction(TripFactory, LocationFactory, UserFactory, $stateParams){
    this.user = UserFactory.get({id: $stateParams.id})
    // this.trip = TripFactory.get({id: $stateParams.id});
    // this.locations = LocationFactory.query({tripId: $stateParams.id});
  }
}());
