"use strict";

astro.controller('ResultsCtrl', function($scope,$state,$window) {

$scope.callAstro = () => {
  $window.location.href = '#/call';
};

});


