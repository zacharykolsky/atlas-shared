
"use strict";

(function(){
  angular
  .module("locations")
  .directive("showLocation",[
    "$state",
    "$stateParams",
    "LocationFactory",
    ShowDirectiveFunction
  ])

  function ShowDirectiveFunction($state,$stateParams,LocationFactory){
    return {
      templateUrl:"js/locations/_show.html",
      replace: true,
      restrict:"A",
      scope:{
        location: "="
      },
      link: function(scope){
        scope.formShow = false;
        scope.showForm = function(){
          scope.formShow = (scope.formShow)?false:true;
        }
      }
    }
  }

})()
