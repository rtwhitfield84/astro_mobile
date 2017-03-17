"use strict";

astro.controller('LoginCtrl', function($scope,$window,$state) {
  $scope.login = () => {
    $window.location.href = '#/call';
  };

  $scope.signUp = () => {
    $window.location.href = '#/register';
  };

  // $scope.login = function() {
  //   console.log("user", $scope.user);
  //     $http({
  //       url: "http://localhost:8000/api-token-auth/",
  //       method: "POST",
  //       data: {
  //         "username": $scope.user.username,
  //         "password": $scope.user.password
  //       }
  //     }).then(
  //       res => {
  //         RootFactory.setToken(res.data.token);
  //         console.log(RootFactory.getToken());
  //         if (res.data.token !== "") {
  //             // $location.path('/');
  //             $window.location.href = '#/call';
  //         }
  //       },
  //       console.error
  //     );
  // };
});
