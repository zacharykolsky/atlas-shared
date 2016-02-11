"use strict";

(function(){
  angular
  .module("locations")
  .directive("showLocation",[
    "$state",
    ShowDirectiveFunction
  ])

  function ShowDirectiveFunction($state){
    return {
      templateUrl:"js/locations/_show.html",
      replace: true,
      restrict:"A",
      scope:{
        location: "="
      },
      link: function(scope, element){



        scope.formShow = false;
        scope.showForm = function(){
          scope.formShow = (scope.formShow)?false:true;

          scope.markers = [];
          scope.input = element[0].querySelector("#pac-input");
          scope.searchBox = new google.maps.places.SearchBox(scope.input);

          window.googleMap.addListener('bounds_changed', function() {
            scope.searchBox.setBounds(window.googleMap.getBounds());
          });

          scope.searchBox.addListener('places_changed', function() {
            // console.log(places[0]);
            // console.log(element.querySelector("#pac-input").value);
            // console.log(document.querySelector("#pac-input").value);
            var places = scope.searchBox.getPlaces();
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
        }
      }
    }
  }

})()
