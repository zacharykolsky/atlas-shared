"use strict";

(function(){
  angular
  .module("users")
  .factory("UserFactory", [
    "$resource",
    UserFactoryFunction
  ]);

  function UserFactoryFunction($resource){
    var baseURL = window.location.href;
    return $resource("http://127.0.0.1:3000/profile.json", {}, {
      // update: {method: "PUT"}
    });
  }
}());
