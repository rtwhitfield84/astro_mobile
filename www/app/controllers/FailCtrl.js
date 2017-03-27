"use strict";

astro.controller('FailCtrl', function($scope,$state,$window,AudioStorage) {


//returns  user to call view after failed identification
$scope.callAstro = () => {
  $window.location.href = '#/call';
};

});
