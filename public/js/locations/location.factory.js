"use strict";

(function(){
  angular
  .module("locations")
  .factory("LocationFactory", [
    "$resource","$state",
    LocationFactoryFunction
  ]);

  function LocationFactoryFunction($resource,$state){
    return $resource("http://localhost:3000/trips/:tripId/locations/:id.json", {tripId:'@tripId'}, {
      update: {method: "PUT"}
    });
  }
}());
