"use strict";

(function(){
  angular
  .module("locations")
  .directive("locationForm", [
    "LocationFactory",
    "$state",
    LocationFormDirectiveFunction
  ]);

  function LocationFormDirectiveFunction(LocationFactory, $state){
    return{
      templateUrl: "js/locations/_form.html",
      scope: {
        location: "="
      },
      link: function(scope){
        scope.create = function(){
          scope.location.$save(function(response){
            console.log(response)
            $state.go("tripsShow", {id: response._id}, {reload: true});
          });
        }
        scope.update = function(){
          scope.location.$update({id: scope.trip._id}, function(response){
            $state.go("tripsShow", {id: response._id}, {reload: false});
          });
        }
        scope.delete = function(){
          scope.location.$delete({id: scope.trip._id}, function(){
            $state.go("tripsIndex", {}, {reload: true});
          });
        }
        scope.cancel = function(){
          $state.go("tripsIndex", {}, {reload: true});
        }
      }
    }
  }
}());
