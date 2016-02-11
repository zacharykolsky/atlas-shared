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
        location: "=",
        trip: "="
      },
      link: function(scope, element){
        var geocoder = new google.maps.Geocoder();
        var codeAddress = function() {
          if (scope.trip){
            geocoder.geocode( { 'address': scope.trip.locale}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                window.googleMap.setCenter(results[0].geometry.location);
                window.googleMap.setZoom(7);
              } else {
                console.log("Geocode was not successful for the following reason: " + status);
              }
            });
          }
        }

        var tripId = $state.params.id;
        scope.markers = [];
        scope.input = document.getElementById('pac-input');
        scope.searchBox = new google.maps.places.SearchBox(scope.input);

        setTimeout(function(){
          window.googleMap.addListener('bounds_changed', function() {
            scope.searchBox.setBounds(window.googleMap.getBounds());
          });
          codeAddress();
        }, 300);

        scope.searchBox.addListener('places_changed', function() {
          var places = scope.searchBox.getPlaces();
          // console.log(places[0]);
          // console.log(document.querySelector("#pac-input").value);
          // console.log(element[0].querySelector("#pac-input").value);
          // document.querySelector("#pac-input").value = places[0].formatted_address;
          element[0].querySelector("input[name=lat]").value = places[0].geometry.location.lat();
          element[0].querySelector("input[name=lon]").value = places[0].geometry.location.lng();
          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          scope.markers.forEach(function(marker) {
            marker.setMap(null);
          });
          scope.markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            scope.markers.push(new google.maps.Marker({
              map: window.googleMap,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          window.googleMap.fitBounds(bounds);
        });




        scope.create = function(){
          var place = element[0].querySelector("#pac-input").value;
          var lat = element[0].querySelector("input[name=lat]").value;
          var lon = element[0].querySelector("input[name=lon]").value;
          scope.location.name = place;
          scope.location.coords = [parseFloat(lat),parseFloat(lon)];
          scope.location.$save({tripId:tripId},function(response){
            $state.go("tripsShow", {id: tripId}, {reload: true});
          });
        }
        scope.update = function(){
          var place = element[0].querySelector("#pac-input").value;
          var lat = element[0].querySelector("input[name=lat]").value;
          var lon = element[0].querySelector("input[name=lon]").value;
          scope.location.name = place;
          scope.location.coords = [parseFloat(lat),parseFloat(lon)];
          console.log(scope.location.coords);
          scope.location.$update({tripId:tripId,id: scope.location._id}, function(response){
            console.log(response);
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
