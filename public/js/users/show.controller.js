"use strict";

(function(){
  angular
  .module("users")
  .controller("UserShowController", [
    "TripFactory",
    "LocationFactory",
    "UserFactory",
    "$stateParams",
    UserShowControllerFunction
  ]);

  function UserShowControllerFunction(TripFactory, LocationFactory, UserFactory, $stateParams){
    console.log($stateParams)
    this.user = UserFactory.get({id: $stateParams.id}, function(user){console.log(user)})
    // this.trip = TripFactory.get({id: $stateParams.id});
    // this.locations = LocationFactory.query({tripId: $stateParams.id});
  }
}());
