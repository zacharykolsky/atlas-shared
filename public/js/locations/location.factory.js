"use strict";

(function(){
  angular
  .module("locations")
  .factory("LocationFactory", [
    "$resource","$state",
    LocationFactoryFunction
  ]);

  function LocationFactoryFunction($resource,$state){
    var baseURL = window.location.href;
    return $resource(baseURL+"/:tripId/locations/:id.json", {tripId:'@tripId'}, {
      update: {method: "PUT"}
    });
  }
}());
