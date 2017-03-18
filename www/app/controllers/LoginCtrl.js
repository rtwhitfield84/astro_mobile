"use strict";

astro.controller('LoginCtrl', function($scope,$window,$state, $http,RootFactory) {
  // $scope.login = () => {
  //   $window.location.href = '#/call';
  // };

  $scope.user = {
    username: "",
    password: ""
  };

  $scope.signUp = () => {
    $window.location.href = '#/register';
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
          console.log(RootFactory.getToken());
          if (res.data.token !== "") {
              // $location.path('/');
              $window.location.href = '#/call';
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
