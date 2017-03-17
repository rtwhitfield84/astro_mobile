"use strict";

astro.controller('LoginCtrl', function($scope,$window,$state) {
  $scope.login = () => {
    $window.location.href = '#/call';
  };
});
