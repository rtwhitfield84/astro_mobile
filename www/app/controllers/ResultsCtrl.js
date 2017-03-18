"use strict";

astro.controller('ResultsCtrl', function($scope,$state,$window,AudioStorage) {

$scope.getTabInfo = () => {
};
$scope.callAstro = () => {
  $window.location.href = '#/call';
};

$scope.saveToTabYard = () => {
  console.log("saved");
  $window.location.href = '#/call';
};
$scope.getTabInfo();
});


// 10.0.0.103:8000
