"use strict";

(function(){
  angular
  .module("users")
  .factory("UserTripFactory", [
    "$resource",
    "UserFactory",
    UserTripFactoryFunction
  ]);

  function UserTripFactoryFunction($resource,UserFactory){

    // function getProfile(){
    //   return new UserFactory.get({});
    // }
    //
    // return {
    //   getProfile().then(function(profile){
    //     return $resource("http://127.0.0.1:3000/users/"+profile._id+"/trips/:id", {userId:'@userId'}, {
    //       update: {method: "PUT"}
    //     });
    //   })
    // }

    return $resource("http://127.0.0.1:3000/users/:userId/trips/:id", {userId:'@userId'}, {
      update: {method: "PUT"}
    });
  }
}());
