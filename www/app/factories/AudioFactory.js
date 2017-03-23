"use strict";

astro.factory('AudioStorage', ($http, $window,$location, RootFactory) => {


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

    return new Promise ((resolve, reject) => {
      convertFileToDataURLviaFileReader(msg,function(base64Data){
        var audioB64 = base64Data;
          $http({
          url:"http://www.methegalaxy.com:3000/",
          method: "POST",
          data: {
          audio: audioB64
        }
    })
    .success((data) => {
      if (data.msg === 'Success') {
        resolve(data);
      } else {
        $location.path('/fail');
      }
    })
    .error((err) => {
      reject(err);
        });
      });
    });
  };



let postTab = (data) => {
  return new Promise((resolve, reject) => {
  let spotify_track_id = data.data.metadata.music[0].external_metadata.spotify.track.id,
      spotify_album_id = data.data.metadata.music[0].external_metadata.spotify.album.id,
      artist = data.data.metadata.music[0].artists[0].name,
      album = data.data.metadata.music[0].album.name.replace(/ *\([^)]*\) */g, ""),
      youtube_video_id = data.data.metadata.music[0].external_metadata.youtube.vid,
      youtube_video_url= `https://www.youtube.com/watch?v=${youtube_video_id}`,
      title = data.data.metadata.music[0].title.replace(/ *\([^)]*\) */g, ""),
      indexLetter = artist.slice(0, 1),
      tabTitle = title.replace(/ *\([^)]*\) */g, "").replace(/ /g,"_").replace(/[^\w\s]/gi, ''),
      artistName = artist.replace(/ /g, '_').replace(/[^\w\s\-]/gi, ''),
      chordUrl = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_crd.htm`,
      tabUrl = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_tab.htm`,
      artistUrl = `https://www.ultimate-guitar.com/tabs/${artistName}_tabs.htm`;

      $http({
        url: `https://api.spotify.com/v1/albums/${data.data.metadata.music[0].external_metadata.spotify.album.id}`,
        method: 'GET'
      }).success((artUrl) => {
        var x = artUrl;
        var album_art = x.images[0].url;

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
        "youtube_video_id": youtube_video_url,
        "art_url": album_art
      },
      headers: {
          'Authorization': "Token " + RootFactory.getToken()
      }
    }).success((obj) => {
      $location.path('/results');
      resolve(obj);
    }).error((err) => {
      $location.path('/fail');
      reject(err);
    });
  })
  .error((err) => {
    $location.path('/fail');
  });
  });
  };
    return {identify, postTab};
  });


