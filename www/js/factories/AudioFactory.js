"use strict";

astro.factory('AudioStorage', ($http) => {

let identify = (buffer) => {
  //filePath is the absolute path to the file(/mnt/sdcard/...)
  // window.plugins.Base64.encodeFile(msg, function(base64){
  //             console.log('file base64 encoding: ' + base64);
  //         });
  console.log("buffer", buffer);
};
return {identify};
});
