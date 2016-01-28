"use strict";

(function(){
  angular
  .module("locations")
  .factory("LocationFactory", [
    "$resource",
    LocationFactoryFunction
  ]);

  function LocationFactoryFunction($resource){
    return $resource("http://127.0.0.1:3000/trips/:tripId/locations/:id.json", {tripId:'@tripId'}, {
      update: {method: "PUT"}
    });
  }
}());
