"use strict";

(function(){
  angular
  .module("users")
  .factory("ProfileFactory", [
    "$resource","$http",
    ProfileFactoryFunction
  ]);

  function ProfileFactoryFunction($resource,$http){
    // var baseURL = window.location.href;
    return $resource("http://127.0.0.1:3000/profile.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
