astro.controller('recordController', function($scope) {

  var recorder = new Object;
  recorder.stop = function() {
    window.plugins.audioRecorderAPI.stop(function(msg) {
      // success
      alert('ok: ' + msg);
    }, function(msg) {
      // failed
      alert('ko: ' + msg);
    });
  };
  recorder.record = function() {
    window.plugins.audioRecorderAPI.record(function(msg) {
      // complete
      // pass msg to acr api
      alert('ok: ' + msg);
    }, function(msg) {
      // failed
      alert('ko: ' + msg);
    }, 6); // record 6 seconds
  };
  recorder.playback = function() {
    window.plugins.audioRecorderAPI.playback(function(msg) {
      // complete
      alert('ok: ' + msg);
    }, function(msg) {
      // failed
      alert('ko: ' + msg);
    });
  };

  $scope.startRecord = () => {
    console.log("recordingstart");
    recorder.record();
  };
  $scope.play = function() {
    console.log("play");
    recorder.playback();
  };
});
