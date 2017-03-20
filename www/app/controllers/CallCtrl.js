"use strict";

astro.controller('CallCtrl', function($scope,$rootScope,$state,$window,AudioStorage,$location) {

  // $rootScope.tabs = [];
  // $scope.song = [];
  // $scope.artist = [];
  // $scope.album = [];

  var recorder = new Object;

  recorder.record = function() {
    window.plugins.audioRecorderAPI.record(function(msg) {
      // complete
      // console.log('ok: ' + msg);
    // AudioStorage.identify(msg);
    $scope.getSongInfo(msg);
    }, function(msg) {
      // failed
      alert('ko: ' + msg);
    }, 5); // record 5 seconds
  };

  $scope.startRecord = () => {
    console.log("recordingstart");
    recorder.record();
  };

  $scope.getSongInfo = (msg) => {
    AudioStorage.identify(msg)
    .then((obj) => {
      AudioStorage.postTab(obj)
      .then((obj) => {
        $rootScope.tabs = obj;
        // $scope.$apply();
        console.log("obj", obj);
        console.log("$scope.tabs", $scope.tabs);
        console.log("obj stringify", JSON.stringify(obj));
        // console.log("obj parse", JSON.parse(obj));
      // $location.url('results');
        // $scope.song = JSON.parse(JSON.stringify(obj));
        // $scope.song = obj;

      $scope.song = obj.song_title;
        console.log("$scope.song beg", $scope.song);
      $scope.artist = obj.artist_name;
      console.log("obj.artist_name", obj.artist_name);
      $scope.album = obj[0].album;
      console.log("obj.album;", obj.album);
      // $scope.$apply();
        // console.log("obj[0]",obj[0]);
        // console.log("$scope.song aft", $scope.song);
        // console.log("$scope.song.title", $scope.song.song_title);
        // console.log("$scope.song.artis_name", $scope.song.artist_name);
        // console.log("$scope.song.album", $scope.song.album);
      // console.log("$scope.song", $scope.song);
      // console.log("$scope.artist", $scope.artist);
      // console.log("$scope.album", $scope.album);
        // console.log("$scope.song end", $scope.song);
    });
    });
  };

  $scope.callAstro = () => {
  $window.location.href = '#/call';
};
});


