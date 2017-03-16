astro.controller('recordController', function($scope, AudioStorage, $base64) {


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
      console.log('ok: ' + msg);
      // var buffer = btoa(msg.split('/').pop());
    AudioStorage.identify(msg);
    }, function(msg) {
      // failed
      alert('ko: ' + msg);
    }, 5); // record 6 seconds
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
    // AudioStorage.identify(msg);
  };
});


  // var ACRCloud = require( 'acr-cloud' );
  // var ACRCloud = require( '../node_modules/acr-cloud/acrcloud.js' );
  // var acr = new ACRCloud({
  //     // required
  //     access_key: '775694bf3b822fa5a6c13f7167050fa6',
  //     access_secret: 'GLzAgIbaVrviG5PZwMQM4yA7ncgZI75XbXveOEEo',
  //     // optional
  //     requrl: 'us-west-2.api.acrcloud.com',
  //     http_method: 'POST',
  //     http_uri: '/v1/identify',
  //     data_type: 'audio',
  //     signature_version: '2',
  //     timestamp: Date.now()
  // });

  // acr.identify(msg)
  //     .then((data) => {
  //       console.log("data", data);
  //     });
