"use strict";

(function(){
  angular
  .module("trips")
  .factory("TripFactory", [
    "$resource",
    TripFactoryFunction
  ]);

  function TripFactoryFunction($resource){
    var baseUrl = window.location.origin;
    return $resource(baseUrl+"/trips/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
