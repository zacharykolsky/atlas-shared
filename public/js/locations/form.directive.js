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
        var tripId = $state.params.id;
        if (!scope.location){
          scope.location = new LocationFactory();
        }

        scope.create = function(){
          scope.location.$save({tripId:tripId},function(response){
            $state.go("tripsShow", {id: tripId}, {reload: true});
          });
        }
        scope.update = function(){
          scope.location.$update({tripId:tripId,id: scope.location._id}, function(response){
            $state.go("tripsShow", {id: tripId}, {reload: true});
          });
        }
        scope.delete = function(){
          scope.location.$delete({tripId:tripId,id: scope.location._id}, function(){
            $state.go("tripsShow", {id: tripId}, {reload: true});
          });
        }
        scope.cancel = function(){
          $state.go("tripsShow", {id: tripId}, {reload: true});
        }
      }
    }
  }
}());
