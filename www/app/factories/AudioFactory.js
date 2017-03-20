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

    return new Promise ((resolve, reject) => {
    $window.location.href = "#/fetch";
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
      console.log("data identify", data);
      console.log("data msg", data.msg);
      if (data.msg === 'Success') {
        // postTab(data);
        resolve(data);
      }
      else {
        $window.location.href = '#/fail';
     }
    })
    .error((err) => {
      reject(err);
        });
      });
    });
  };

  // let getAlbumArt = (id) =>{
  //   $http.get(`https://api.spotify.com/v1/albums/${id}`)
  //   .then(
  //     function(response){
  //       console.log("response.data", response.data);
  //       return response.data;
  //     },
  //     function(response){
  //       console.log("response", response);
  //     });
  // };

//   let getAlbumArt = (id) => {
//     return new Promise((resolve,reject) => {
//     $http({
//       url: `https://api.spotify.com/v1/albums/${id}`,
//       method: 'GET'
//     }).success((artUrl) => {
//       var album_art = artUrl.images[0].url;
//       resolve(album_art);
//       console.log("album_art", album_art);
//     }).error((err) => {
//       console.log(err);
//     });
// });
// };
//


let postTab = (data) => {
  return new Promise((resolve, reject) => {
  console.log("postTabdata sttirng", JSON.stringify(data));
  if (data.data.metadata.music[0].external_metadata.spotify) {
        var spotify_track_id = data.data.metadata.music[0].external_metadata.spotify.track.id;
        var spotify_album_id = data.data.metadata.music[0].external_metadata.spotify.album.id;
  } else {
        var spotify_track_id = '';
        var spotify_album_id = '';
  }
  var art_url = '';
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
        "youtube_video_id": youtube_video_id,
        "art_url": art_url
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












// let postTab = (data) => {
//   return new Promise((resolve, reject) => {

//     $http({
//       url: `https://api.spotify.com/v1/albums/${data.data.metadata.music[0].external_metadata.spotify.album.id}`,
//       method: 'GET'
//     }).success((artUrl) => {
//       var album_art = artUrl.images[0].url;
//       // resolve(album_art);
//       console.log("album_art", album_art);


//   // console.log("postTabdata sttirng", JSON.stringify(data));
//   if (data.data.metadata.music[0].external_metadata.spotify) {
//         var spotify_track_id = data.data.metadata.music[0].external_metadata.spotify.track.id;
//         var spotify_album_id = data.data.metadata.music[0].external_metadata.spotify.album.id;
//   } else {
//         var spotify_track_id = '';
//         var spotify_album_id = '';
//         var art_url = '';
//   }
//   var artist = data.data.metadata.music[0].artists[0].name;
//   var album = data.data.metadata.music[0].album.name;
//   console.log("data.data.metadata.music[0].external_metadata", JSON.stringify(data.data.metadata.music[0].external_metadata.spotify));
//   var youtube_video_id = data.data.metadata.music[0].external_metadata.youtube.vid;
//   console.log("artist", artist);
//   var title = data.data.metadata.music[0].title;
//   var indexLetter = artist.slice(0, 1);
//   var tabTitle = title.replace(/ *\([^)]*\) */g, "").replace(/ /g,"_").replace(/[^\w\s]/gi, '');
//   var artistName = artist.replace(/ /g, '_').replace(/[^\w\s]/gi, '');
//   var chordUrl = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_crd.htm`;
//   var tabUrl = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_tab.htm`;
//   var artistUrl = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}_tabs.htm`;
//   console.log("artistUrl", artistUrl);

//     console.log("artURLIMG", art_url);
//     $http({
//       url:"https://api-astro.herokuapp.com/tabs/",
//       method: 'POST',
//       data: {
//         "artist_url": artistUrl,
//         "chords_url": chordUrl,
//         "tab_url": tabUrl,
//         "artist_name": artist,
//         "song_title": title,
//         "album": album,
//         "spotify_track_id": spotify_track_id,
//         "spotify_album_id": spotify_album_id,
//         "youtube_video_id": youtube_video_id,
//         "art_url": album_art
//       },
//       headers: {
//           'Authorization': "Token " + RootFactory.getToken()
//       }
//     }).then((obj) => {
//       console.log("obj suc", JSON.stringify(obj));
//       resolve(obj);
//       $window.location.href = '#/results';
//     }).error((err) => {
//       console.log("errrrr", JSON.stringify(err));
//       reject(err);
//     });
//   });
//       }).error((err) => {
//     console.log(err);
//   });
// };
//   return {identify, postTab};
// });



