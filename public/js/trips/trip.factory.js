"use strict";

(function(){
  angular
  .module("trips")
  .factory("TripFactory", [
    "$resource",
    TripFactoryFunction
  ]);

  function TripFactoryFunction($resource){
    var baseURL = window.location.href;
    return $resource(baseURL+"/trips/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
