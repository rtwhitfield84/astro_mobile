"use strict";

astro.factory('AudioStorage', ($http) => {

  function convertFileToDataURLviaFileReader(url, callback){
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function() {
          var reader  = new FileReader();
          reader.onloadend = function () {
              callback(reader.result);
          };
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
  }

let identify = (msg) => {
  convertFileToDataURLviaFileReader(msg,function(base64Data){
    var audioB64 = base64Data;
  return new Promise ((resolve, reject) => {
    $http({
      url:"http://www.methegalaxy.com:3000/",
      method: "POST",
      data: {
        audio: audioB64
      }
    })
    .success((data) => {
      // console.log("metadata", data.data.metadata));
      console.log("music[0]", data.data.metadata.music[0]);
      console.log("artist", data.data.metadata.music[0].artists[0].name);
      let artist = data.data.metadata.music[0].artists[0].name;
      console.log("title", data.data.metadata.music[0].title);
      let title = data.data.metadata.music[0].title;
      console.log("album", data.data.metadata.music[0].album.name);
      // console.log("metadata", data.metadata.artists));

  let indexLetter = artist.slice(0, 1);
  let tabTitle = title.replace(/ /g,"_").replace(/[^\w\s]/gi, '');
  let artistName = artist.replace(/ /g, '_').replace(/[^\w\s]/gi, '');
  console.log("indexLetter", indexLetter);
  console.log("title", tabTitle );
  console.log("artist", artistName);
  let chordLink = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_crd.htm`;
  let tabLink = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_tab.htm`;
  console.log("link chord:",chordLink);
  console.log("link tab :",tabLink);
    })
    .error((err) => {
      reject(err);
    });
  });
  });
};
return {identify};
});
