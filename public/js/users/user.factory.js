"use strict";

(function(){
  angular
  .module("users")
  .factory("UserFactory", [
    "$resource","$http",
    UserFactoryFunction
  ]);

  function UserFactoryFunction($resource,$http){
    var baseUrl = window.location.origin;
    return $resource(baseUrl+"/users/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
