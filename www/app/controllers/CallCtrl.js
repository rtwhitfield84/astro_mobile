"use strict";

astro.controller('CallCtrl', function($scope,$rootScope,$state,$window,AudioStorage,$location) {


  var recorder = new Object;

  recorder.record = function() {
    window.plugins.audioRecorderAPI.record(function(msg) {
      // complete
    $scope.getSongInfo(msg);
    }, function(msg) {
      // failed
      console.log('ko: ' + msg);
    }, 5); // record 5 seconds
  };

  $scope.startRecord = () => {
    console.log("recordingstart");
    recorder.record();
    $window.location.href = "#/fetch";

  };

  $scope.getSongInfo = (msg) => {
    AudioStorage.identify(msg)
    .then((obj) => {
      AudioStorage.postTab(obj)
      .then((obj) => {
        $rootScope.tabs = obj;
        console.log("$rootScope.tabs", $rootScope.tabs);
    });
    });
  };

  $scope.callAstro = () => {
  $window.location.href = '#/call';
};
});


