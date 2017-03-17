"use strict";

astro.controller('RegisterCtrl', [
  '$scope',
  '$http',
  '$location',
  'RootFactory',
function($scope, $http, $location, RootFactory) {

  $scope.user = {
    email: "",
    username: "",
    password: ""
  };

  $scope.register = function() {
      $http({
        url: "http://localhost:8000/register",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "username": $scope.user.username,
          "password": $scope.user.password,
          "email": $scope.user.email,
        }
      }).then(
        res => {
          RootFactory.setToken(res.data.token);
          console.log(RootFactory.getToken());
          if (res.data.success === true) {
              $window.location.href = '#/call';
          }
        },
        console.error
      );
  };

}]);
