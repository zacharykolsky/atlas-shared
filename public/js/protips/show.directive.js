
"use strict";

(function(){
  angular
  .module("protips")
  .directive("showProtip",[
    "$state",
    "$stateParams",
    "ProtipFactory",
    ShowDirectiveFunction
  ])

  function ShowDirectiveFunction($state,$stateParams,ProtipFactory){
    return {
      templateUrl:"js/protips/_show.html",
      replace: true,
      restrict:"A",
      scope:{
        protip: "="
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
