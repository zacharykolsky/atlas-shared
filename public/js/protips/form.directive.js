"use strict";

(function(){
  angular
  .module("protips")
  .directive("protipForm", [
    "ProtipFactory",
    "TripFactory",
    "$state",
    ProtipFormDirectiveFunction
  ]);

  function ProtipFormDirectiveFunction(ProtipFactory, TripFactory, $state){
    return{
      templateUrl: "js/protips/_form.html",
      scope: {
        protip: "="
      },
      link: function(scope){
        var tripId = $state.params.id;

        scope.create = function(){
          scope.protip.$save({tripId:tripId},function(response){
            $state.go("tripsShow", {id: tripId}, {reload: true});
          });
        }
        scope.update = function(){
          scope.protip.$update({tripId:tripId,id: scope.protip._id}, function(response){
            $state.go("tripsShow", {id: tripId}, {reload: true});
          });
        }
        scope.delete = function(){
          scope.protip.$delete({tripId:tripId,id: scope.protip._id}, function(){
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
