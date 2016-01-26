"use strict";

(function(){
  angular
  .module("atlas", [
    "ui.router",
    "trips",
    "locations",
    "users"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("userIndex", {
      url: "/profile",
      templateUrl: "js/users/index.html",
      controller: "UserIndexController",
      controllerAs: "UserIndexViewModel"
    })
    .state("userShow", {
      url: "/user/:id",
      templateUrl: "js/users/show.html",
      controller: "UserShowController",
      controllerAs: "UserShowViewModel"
    })
    .state("tripsIndex", {
      url: "/trips",
      templateUrl: "js/trips/index.html",
      controller: "TripIndexController",
      controllerAs: "TripIndexViewModel"
    })
    .state("tripsShow", {
      url: "/trips/:id",
      templateUrl: "js/trips/show.html",
      controller: "TripShowController",
      controllerAs: "TripShowViewModel"
    })
  }
}());
