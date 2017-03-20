"use strict";

astro.controller('ResultsCtrl', function($scope,$state,$window,TabStorage) {
//   console.log("results");
// $scope.info = [];
// $scope.getTabInfo = () => {
//   TabStorage.getSong
//   .then((song) => {
//     $scope.info = song;
//     console.log("song", $scope.info);
//     console.log("songstinggg: ", JSON.stringify($scope.info));
//   });
// };
$scope.callAstro = () => {
  $window.location.href = '#/call';
};

$scope.saveToTabYard = () => {
  console.log("saved");
  $window.location.href = '#/call';
};
// $scope.getTabInfo();
});


// 10.0.0.103:8000
