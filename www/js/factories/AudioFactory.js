"use strict";

astro.factory('AudioStorage', ($http) => {

  function convertFileToDataURLviaFileReader(url, callback){
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function() {
          var reader  = new FileReader();
          reader.onloadend = function () {
              callback(reader.result);
              console.log("reader result", reader.result);
          };
          reader.readAsDataURL(xhr.response);
          console.log("reader.readAsDataURL(xhr.response): ",reader.readAsDataURL(xhr.response));
      };
      console.log("url from convert", url);
      xhr.open('GET', url);
      xhr.send();
      console.log("xhr.send()", xhr.send());
  }

let identify = (msg) => {
  console.log("msg", msg);
  convertFileToDataURLviaFileReader(msg,function(base64Data){
    var audioB64 = base64Data;
    console.log("audioB64", audioB64);
  // console.log("bufatob: ", atob(buffer));
  return new Promise ((resolve, reject) => {
    $http({
      url:"http://www.methegalaxy.com:3000/", //3000?example
      method: "POST",
      data: {
        audio: audioB64
      }
    })
    .success((data) => {
      console.log("data from identify",data);
      console.log("data msg from identify",data.msg);
      console.log("data success from identify",data.success);
      console.log("data stringify", JSON.stringify(data));
    })
    .error((err) => {
      reject(err);
    });
  });
  });
};
return {identify};
});
