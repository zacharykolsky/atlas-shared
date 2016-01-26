"use strict";

(function(){
  angular
  .module("users")
  .controller("UserIndexController", [
    "TripFactory",
    "LocationFactory",
    "UserFactory",
    "$stateParams",
    "$http",
    UserIndexControllerFunction
  ]);

  function UserIndexControllerFunction(TripFactory, LocationFactory, UserFactory, $stateParams, $http){
    this.user = UserFactory.query(function(profile){
      console.log(profile)
    })

    $http.get("http://127.0.0.1:3000/profile.json")
      .then(function(response){console.log(response.data)})

    // console.log(this.user)
    // this.trips = TripFactory.query();
    // this.newTrip = new TripFactory();
    // this.trip = TripFactory.get({id: $stateParams.id});
    // this.locations = LocationFactory.query({tripId: $stateParams.id});
  }
}());
