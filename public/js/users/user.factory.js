"use strict";

(function(){
  angular
  .module("users")
  .factory("UserFactory", [
    "$resource","$http",
    UserFactoryFunction
  ]);

  function UserFactoryFunction($resource,$http){
    // var baseURL = window.location.href;
    return $resource("http://127.0.0.1:3000/profile.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
