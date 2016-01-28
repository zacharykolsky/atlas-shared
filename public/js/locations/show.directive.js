"use strict";

(function(){
  angular
  .module("locations")
  .directive("showLocation",[
    ShowDirectiveFunction
  ])

  function ShowDirectiveFunction(){
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
