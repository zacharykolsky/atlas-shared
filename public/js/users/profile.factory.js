"use strict";

(function(){
  angular
  .module("users")
  .factory("ProfileFactory", [
    "$resource",
    ProfileFactoryFunction
  ]);

  function ProfileFactoryFunction($resource){
    var baseUrl = window.location.origin;
    return $resource(baseUrl+"/profile.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
