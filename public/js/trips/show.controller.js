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

    L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhc2VncnViZXIiLCJhIjoidV9tdHNYSSJ9.RRyvDLny4YwDwzPCeOJZrA';
    var map = L.mapbox.map('map', 'mapbox.streets');


  }
}());
