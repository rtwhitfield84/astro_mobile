"use strict";

astro.controller('CallCtrl', function($scope, AudioStorage) {


  var recorder = new Object;

  recorder.record = function() {
    window.plugins.audioRecorderAPI.record(function(msg) {
      // complete
      console.log('ok: ' + msg);
    AudioStorage.identify(msg);
    }, function(msg) {
      // failed
      alert('ko: ' + msg);
    }, 5); // record 5 seconds
  };

  $scope.startRecord = () => {
    console.log("recordingstart");
    recorder.record();
  };
});


