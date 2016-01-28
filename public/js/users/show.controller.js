"use strict";

(function(){
  angular
  .module("users")
  .controller("UserShowController", [
    "UserFactory",
    "$stateParams",
    UserShowControllerFunction
  ]);

  function UserShowControllerFunction(UserFactory, $stateParams){
    this.user = UserFactory.get({id: $stateParams.id})
  }
}());
