"use strict";

astro.controller('FailCtrl', function($scope,$state,$window,AudioStorage) {


$scope.callAstro = () => {
  $window.location.href = '#/call';
};

});
