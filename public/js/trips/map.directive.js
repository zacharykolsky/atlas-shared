"use strict";

(function(){
  angular
  .module("trips")
  .directive("map", [
    "TripFactory",
    "$state",
    "$http",
    TripMapDirectiveFunction
  ]);

  function TripMapDirectiveFunction(TripFactory, $state, $http){
    return{
      templateUrl: "js/trips/_map.html",
      scope: {
        trip: "="
      },
      link: function(scope){
        // console.log($state.params.id)
        L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhc2VncnViZXIiLCJhIjoidV9tdHNYSSJ9.RRyvDLny4YwDwzPCeOJZrA';
        var map = L.mapbox.map('map', 'mapbox.streets');

        //query node osm geocoder
        TripFactory.get({id:$state.params.id},function(trip){
          // console.log(trip.locale)
          $http.get("http://127.0.0.1:3000/checkBounds?q="+trip.locale).then(function(result){
            console.log(result.data)
            var bounding = result.data.boundingbox;
            var sw = L.latLng(bounding[0],bounding[2]);
            var ne = L.latLng(bounding[1],bounding[3]);
            var bounds = L.latLngBounds(sw,ne);
            map.fitBounds(bounds)

            var geocoderOptions = {
              bounds: bounds,
              // markers: true,
              // layers: 'coarse',
              expanded:true
            }

            var geocoder = L.control.geocoder('search-R7-i3bQ',geocoderOptions).addTo(map);
            var geocontainer = document.getElementById("geocontainer")
            geocontainer.appendChild(geocoder.getContainer());

            geocoder.on("results", function(e){
              console.log(e)
            })

          })


        })

        // var geocoderOptions = {
        //   bounds: true,
        //   markers: false,
        //   layers: 'coarse',
        //   expanded:true
        // }
        //
        // var geocoder = L.control.geocoder('search-R7-i3bQ',geocoderOptions).addTo(map);
        // var geocontainer = document.getElementById("geocontainer")
        // geocontainer.appendChild(geocoder.getContainer());
        //
        // geocoder.on("select", function(e){
        //   console.log(e)
        // })

      }
    }
  }
}());
