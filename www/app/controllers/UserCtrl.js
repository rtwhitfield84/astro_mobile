"use strict";

astro.controller('UserCtrl', function($scope, $http, $window, RootFactory) {

  $scope.user = {
    email: "",
    username: "",
    password: ""
  };

  $scope.signUp = () => {
    $window.location.href = '#/register';
  };

  $scope.register = function() {
      $http({
        url: "https://api-astro.herokuapp.com/register",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "username": $scope.user.username,
          "password": $scope.user.password,
          "email": $scope.user.email
        }
      }).then(
        res => {
          if (res.status === 200) {
            $scope.login($scope.user);
          }
        },
        console.error
      );
  };

  $scope.login = function() {
    console.log("hi");
    console.log("user", $scope.user);
    try {
      $http({
        url: "https://api-astro.herokuapp.com/api-token-auth/",
        method: "POST",
        data: {
          "username": $scope.user.username,
          "password": $scope.user.password
        }
      }).then(
        res => {
          RootFactory.setToken(res.data.token);
          if (res.data.token !== "") {
            $window.location.href = '#/call';
          console.log(RootFactory.getToken());
          }
        },
        console.error
      );
  }
  catch(err){
    console.log("err", err);
  }
  };

});
