"use strict";

astro.controller('CallCtrl', function($scope,$rootScope,$state,$window,AudioStorage,$location) {


  var recorder = new Object;

//records 5 sec of audio source and initiates identification process
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
    recorder.record();
    $window.location.href = "#/fetch";

  };

  $scope.getSongInfo = (msg) => {
    AudioStorage.identify(msg)
    .then((obj) => {
      AudioStorage.postTab(obj)
      .then((obj) => {
        $rootScope.tabs = obj;
    });
    });
  };

  $scope.callAstro = () => {
  $window.location.href = '#/call';
};
});


