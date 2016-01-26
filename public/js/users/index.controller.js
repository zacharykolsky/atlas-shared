"use strict";

(function(){
  angular
  .module("users")
  .controller("UserIndexController", [
    "TripFactory",
    "LocationFactory",
    "UserFactory",
    "UserTripFactory",
    "$stateParams",
    "$http",
    UserIndexControllerFunction
  ]);

  function UserIndexControllerFunction(TripFactory, LocationFactory, UserFactory, UserTripFactory, $stateParams, $http){
    this.user = UserFactory.get({},function(user){console.log(user)});
    // this.user = {};
    this.trips = [];

    // console.log(this)
    // new UserFactory.get({}).then(function(user){
    //   console.log(this)
    //   this.user = user;
    //   new UserTripFactory.get({userId: scope.user._id}).then(function(trips){
    //     this.trips = trips;
    //   }.bind(this))
    // });
    // this.trips = new UserTripFactory.get({userId: this.user._id});
    // console.log(this.trips)

    // this.newTrip = new TripFactory();
    // this.trip = TripFactory.get({id: $stateParams.id});
    // this.locations = LocationFactory.query({tripId: $stateParams.id});
  }
}());
