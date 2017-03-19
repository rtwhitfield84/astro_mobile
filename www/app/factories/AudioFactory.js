"use strict";

astro.factory('AudioStorage', ($http, $window, RootFactory) => {

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

    $window.location.href = "#/fetch";
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
      console.log("data identify", data);
      console.log("data msg", data.msg);
      if (data.msg === 'Success') {
        postTab(data);
        // $window.location.href = '#/results';
        // console.log("metadata", data.data.metadata));
        // console.log("music[0]", data.data.metadata.music[0]);
        // console.log("artist", data.data.metadata.music[0].artists[0].name);
        // let artist = data.data.metadata.music[0].artists[0].name;
        // console.log("title", data.data.metadata.music[0].title);
        // let title = data.data.metadata.music[0].title;
        // console.log("album", data.data.metadata.music[0].album.name);
        // // console.log("metadata", data.metadata.artists));

        // let indexLetter = artist.slice(0, 1);
        // let tabTitle = title.replace(/ /g,"_").replace(/[^\w\s]/gi, '');
        // let artistName = artist.replace(/ /g, '_').replace(/[^\w\s]/gi, '');
        // console.log("indexLetter", indexLetter);
        // console.log("title", tabTitle );
        // console.log("artist", artistName);
        // let chordLink = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_crd.htm`;
        // let tabLink = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_tab.htm`;
        // console.log("link chord:",chordLink);
        // console.log("link tab :",tabLink);
      }
      else {
        $window.location.href = '#/fail';
     }
        resolve(data);
    })
    .error((err) => {
      reject(err);
        });
      });
    });
  };
  let postTab = (data) => {
    console.log("postTabdata sttirng", JSON.stringify(data));
    if (data && data.data && data.data.metadata
     && data.data.metadata.music[0]
     && data.data.metadata.music[0].external_metadata
     && data.data.metadata.music[0].external_metadata.spotify) {
          var spotify_track_id = data.data.metadata.music[0].external_metadata.spotify.track.id;
          var spotify_album_id = data.data.metadata.music[0].external_metadata.spotify.album.id;
    } else {
          var spotify_track_id = '';
          var spotify_album_id = '';
    }
    var artist = data.data.metadata.music[0].artists[0].name;
    var album = data.data.metadata.music[0].album.name;
    console.log("data.data.metadata.music[0].external_metadata", JSON.stringify(data.data.metadata.music[0].external_metadata.spotify));
    var youtube_video_id = data.data.metadata.music[0].external_metadata.youtube.vid;
    console.log("artist", artist);
    var title = data.data.metadata.music[0].title;
    var indexLetter = artist.slice(0, 1);
    var tabTitle = title.replace(/ *\([^)]*\) */g, "").replace(/ /g,"_").replace(/[^\w\s]/gi, '');
    var artistName = artist.replace(/ /g, '_').replace(/[^\w\s]/gi, '');
    var chordUrl = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_crd.htm`;
    var tabUrl = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_tab.htm`;
    var artistUrl = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}_tabs.htm`;
    console.log("artistUrl", artistUrl);

    return new Promise((resolve, reject) => {
      console.log("artist_url in prom", artistUrl);
      console.log("root", RootFactory.getToken());
      $http({
        url:"https://api-astro.herokuapp.com/tabs/",
        method: 'POST',
        data: {
          "artist_url": artistUrl,
          "chords_url": chordUrl,
          "tab_url": tabUrl,
          "artist_name": artist,
          "song_title": title,
          "album": album,
          "spotify_track_id": spotify_track_id,
          "spotify_album_id": spotify_album_id,
          "youtube_video_id": youtube_video_id
        },
        headers: {
            'Authorization': "Token " + RootFactory.getToken()
        }
      }).success((obj) => {
        console.log("obj suc", JSON.stringify(obj));
        $window.location.href = '#/results';
        resolve(obj);
      }).error((err) => {
        console.log("errrrr", JSON.stringify(err));
        reject(err);
      });
    });
    };
return {identify, postTab};
});

