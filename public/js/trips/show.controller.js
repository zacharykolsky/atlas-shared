"use strict";

(function(){
  angular
  .module("trips")
  .controller("TripShowController", [
    "TripFactory",
    "$stateParams",
    TripShowControllerFunction
  ]);

  function TripShowControllerFunction(TripFactory, $stateParams){
    this.trip = TripFactory.get({id: $stateParams.id});
  }
}());
