"use strict";

(function(){
  angular
  .module("locations")
  .factory("LocationFactory", [
    "$resource",
    LocationFactoryFunction
  ]);

  function LocationFactoryFunction($resource){
    var baseUrl = window.location.origin;
    return $resource(baseUrl+ "/trips/:tripId/locations/:id.json", {tripId:'@tripId'}, {
      update: {method: "PUT"}
    });
  }
}());
