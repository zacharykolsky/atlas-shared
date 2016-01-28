"use strict";

(function(){
  angular
  .module("locations")
  .directive("locationForm", [
    "LocationFactory",
    "TripFactory",
    "$state",
    LocationFormDirectiveFunction
  ]);

  function LocationFormDirectiveFunction(LocationFactory, TripFactory, $state){
    return{
      templateUrl: "js/locations/_form.html",
      scope: {
        location: "="
      },
      link: function(scope){
        var tripId = $state.params.id;

        scope.create = function(){
          var place = document.querySelector(".leaflet-pelias-input").value;
          var lat = document.querySelector("input[name=lat]").value;
          var lon = document.querySelector("input[name=lon]").value;
          scope.location.name = place;
          scope.location.coords = [parseFloat(lat),parseFloat(lon)];
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
