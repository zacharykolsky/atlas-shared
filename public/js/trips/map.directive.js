"use strict";

(function(){
  angular
  .module("trips")
  .directive("map", [
    "TripFactory",
    "LocationFactory",
    "$state",
    "$http",
    TripMapDirectiveFunction
  ]);

  function TripMapDirectiveFunction(TripFactory, LocationFactory, $state, $http){
    return{
      templateUrl: "js/trips/_map.html",
      scope: {
        trip: "=",
        locations: "="
      },
      link: function(scope){

        scope.markers = [];

        scope.initMap = (function() {
          window.googleMap = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(38.9047, -77.0164),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
        })();
        scope.baseUrl = window.location.origin;

        scope.drawPlace = function(place) {
          if (place.coords[0] !== null){
            var loc = new google.maps.LatLng(place.coords[0], place.coords[1]);
            var marker = new google.maps.Marker({
              position: loc,
              map: window.googleMap
            });
            scope.markers.push(marker);

            var contentString =  "<div>"+
            "<p><h5>Location: "+place.name+"</h5></p>"+
            "<p>Description: "+place.desc+"</p>";
            $state.params.id ? contentString+="": contentString+=("<p><a href="+scope.baseUrl+"/trips/"+place.tripId+">View Trip</a></p>")
            contentString+=("</div>");

            var infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', (function(marker, contentString){
              return function() {
                infoWindow.setContent(contentString);
                infoWindow.open(window.googleMap, marker);
              }
            })(marker, contentString));
          }
        }
        if ($state.params.id){
            TripFactory.get({id:$state.params.id},function(trip){
            $http.get(scope.baseUrl+"/trips/"+trip._id+"/locations.json").then(function(response){
              var places = response.data;
              places.forEach(scope.drawPlace)
            })
          })
        }else{
          $http.get(scope.baseUrl+"/locations.json").then(function(response){
            var places = response.data;
            places.forEach(scope.drawPlace);
          })
        }
      }
    }
  }
}());
