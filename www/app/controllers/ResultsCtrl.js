"use strict";

astro.controller('ResultsCtrl', function($scope,$state,$window) {


//returns  user to call view after successful identification
$scope.callAstro = () => {
  $window.location.href = '#/call';
};

});


