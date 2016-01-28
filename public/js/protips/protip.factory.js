"use strict";

(function(){
  angular
  .module("protips")
  .factory("ProtipFactory", [
    "$resource",
    ProtipFactoryFunction
  ]);

  function ProtipFactoryFunction($resource){
    return $resource("http://127.0.0.1:3000/trips/:tripId/protips/:id.json", {tripId:'@tripId'}, {
      update: {method: "PUT"}
    });
  }
}());
