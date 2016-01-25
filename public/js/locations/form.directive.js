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
          console.log(scope.location)
          scope.location.$save({tripId:tripId},function(response){
            $state.go("tripsShow", {id: tripId}, {reload: true});
          });
        }
        scope.update = function(){
          scope.location.$update({id: scope.trip._id}, function(response){
            $state.go("tripsShow", {id: tripId}, {reload: false});
          });
        }
        // scope.delete = function(){
        //   scope.location.$delete({id: scope.trip._id}, function(){
        //     $state.go("tripsIndex", {}, {reload: true});
        //   });
        // }
        // scope.cancel = function(){
        //   $state.go("tripsIndex", {}, {reload: true});
        // }
      }
    }
  }
}());
