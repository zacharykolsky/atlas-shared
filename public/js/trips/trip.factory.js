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
    return $resource("http://127.0.0.1:3000/trips/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
