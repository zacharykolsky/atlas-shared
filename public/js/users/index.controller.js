"use strict";

(function(){
  angular
  .module("users")
  .controller("UserIndexController", [
    "TripFactory",
    "ProfileFactory",
    "UserFactory",
    UserIndexControllerFunction
  ]);

  function UserIndexControllerFunction(TripFactory,ProfileFactory,UserFactory){
    this.user = ProfileFactory.get({},function(user){
      user.newTrip = new TripFactory()
    });
    this.users = UserFactory.query();
  }
}());
