"use strict";

(function(){
  angular
  .module("users")
  .factory("ProfileFactory", [
    "$resource",
    ProfileFactoryFunction
  ]);

  function ProfileFactoryFunction($resource){
    return $resource("http://127.0.0.1:3000/profile.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
