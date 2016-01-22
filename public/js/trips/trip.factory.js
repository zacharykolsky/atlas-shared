"use strict";

(function(){
  angular
  .module("trips")
  .factory("TripFactory", [
    "$resource",
    TripFactoryFunction
  ]);

  function TripFactoryFunction($resource){
    return $resource("http://localhost:3000/trips/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
