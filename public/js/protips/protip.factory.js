"use strict";

(function(){
  angular
  .module("protips")
  .factory("ProtipFactory", [
    "$resource",
    ProtipFactoryFunction
  ]);

  function ProtipFactoryFunction($resource){
    var baseUrl = window.location.origin;
    return $resource(baseUrl+"/trips/:tripId/protips/:id.json", {tripId:'@tripId'}, {
      update: {method: "PUT"}
    });
  }
}());
