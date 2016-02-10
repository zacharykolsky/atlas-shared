"use strict";

(function(){
  angular
  .module("trips")
  .directive("tripForm", [
    "TripFactory",
    "$state",
    TripFormDirectiveFunction
  ]);

  function TripFormDirectiveFunction(TripFactory, $state){
    return{
      templateUrl: "js/trips/_form.html",
      scope: {
        trip: "="
      },
      link: function(scope){
        scope.input = document.getElementById('pac');
        scope.searchBox = new google.maps.places.SearchBox(scope.input);
        if (!scope.trip){
          scope.trip = new TripFactory();
        }
        scope.create = function(){
          scope.trip.$save(function(response){
            $state.go("tripsShow", {id: response._id}, {reload: true});
          });
        }
        scope.update = function(){
          scope.trip.$update({id: scope.trip._id}, function(response){
            $state.go("tripsShow", {id: response._id}, {reload: true});
          });
        }
        scope.delete = function(){
          scope.trip.$delete({id: scope.trip._id}, function(){
            $state.go("userIndex", {}, {reload: true});
          });
        }
        scope.cancel = function(){
          $state.go("userIndex", {}, {reload: true});
        }
      }
    }
  }
}());
