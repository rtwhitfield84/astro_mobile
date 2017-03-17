"use strict";

astro.controller('ResultsCtrl', function($scope,$state,$window,AudioStorage) {


$scope.callAstro = () => {
  $window.location.href = '#/call';
};

$scope.saveToTabYard = () => {
  console.log("saved");
};
});
