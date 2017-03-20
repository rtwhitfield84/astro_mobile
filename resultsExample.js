{
    "music": [{
        "external_ids": {
            "isrc": "GBSTK0700003",
            "upc": "093624988298"
        },
        "play_offset_ms": 20660,
        "external_metadata": {
            "musicstory": {
                "track": {
                    "id": "17266007"
                }
            },
            "youtube": {
                "vid": "BbWBRnDK_AE"
            },
            "deezer": {
                "album": {
                    "id": 1347094
                },
                "artists": [{
                    "id": 399
                }],
                "genres": [{
                    "id": 85
                }],
                "track": {
                    "id": 14633422
                }
            },
            "spotify": {
                "album": {
                    "id": "7eyQXxuf2nGj9d2367Gi5f"
                },
                "artists": [{
                    "id": "4Z8W4fKeB5YxbusRsdQVPb"
                }],
                "track": {
                    "id": "5k7VKj1Xwy5DjO4B0PdAOb"
                }
            },
            "itunes": {
                "album": {
                    "id": 1109714933
                },
                "artists": [{
                    "id": 657515
                }],
                "track": {
                    "id": 1109715165
                }
            },
            "lyricfind": {
                "lfid": "001-12315782"
            }
        },
        "release_date": "2007-12-28",
        "genres": [{
            "name": "Alternative"
        }],
        "title": "Nude",
        "label": "Warner/Chappell Music",
        "duration_ms": 255000,
        "album": {
            "name": "In Rainbows"
        },
        "acrid": "04234cbde9c4d4b31d3e2f4355b3b80c",
        "result_from": 3,
        "artists": [{
            "name": "Radiohead"
        }]
    }],
    "timestamp_utc": "2017-03-16 23:00:24"
 }


































//music[0]

 {
  "external_ids": {
    "isrc": "GBSTK0700004",
    "upc": "093624988298"
  },
  "play_offset_ms": 9940,
  "external_metadata": {
    "musicstory": {
      "track": {
        "id": "54782"
      }
    },
    "deezer": {
      "album": {
        "id": 1347094
      },
      "artists": [{
        "id": 399
      }],
      "genres": [{
        "id": 85
      }],
      "track": {
        "id": 14633423
      }
    },
    "youtube": {
      "vid": "V_Ydoe4Q-Gg"
    },
    "spotify": {
      "album": {
        "id": "7eyQXxuf2nGj9d2367Gi5f"
      },
      "artists": [{
        "id": "4Z8W4fKeB5YxbusRsdQVPb"
      }],
      "track": {
        "id": "4Iyo50UoYhuuYORMLrGDci"
      }
    },
    "lyricfind": {
      "lfid": "001-12315783"
    },
    "itunes": {
      "album": {
        "id": 1109714933
      },
      "artists": [{
        "id": 657515
      }],
      "track": {
        "id": 1109715168
      }
    }
  },
  "release_date": "2007-12-28",
  "title": "Weird Fishes/Arpeggi",
  "genres": [{
    "name": "Alternative"
  }],
  "label": "Warner/Chappell Music",
  "duration_ms": 318000,
  "album": {
    "name": "In Rainbows"
  },
  "acrid": "6501e83ccab9b4f6ef586e1fa2dd90fb",
  "result_from": 3,
  "artists": [{
    "name": "Radiohead"
  }]
 }

 //external md

 {
  "lyricfind": {
    "lfid": "001-6906636"
  },
  "youtube": {
    "vid": "fJ9rUzIMcZQ"
  },
  "deezer": {
    "album": {
      "id": "14595324"
    },
    "artists": [{
      "id": "412"
    }],
    "track": {
      "id": "136440246"
    }
  },
  "itunes": {
    "album": {
      "id": 73195721
    },
    "track": {
      "id": 62766808
    }
  }
}


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
    console.log("postTabdata", data);
    let artist = data.data.metadata.music[0].artists[0].name;
    console.log("artist", artist);
    let title = data.data.metadata.music[0].title;
    let indexLetter = artist.slice(0, 1);
    let tabTitle = title.replace(/ /g,"_").replace(/[^\w\s]/gi, '');
    let artistName = artist.replace(/ /g, '_').replace(/[^\w\s]/gi, '');
    let chordUrl = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_crd.htm`;
    let tabUrl = `https://tabs.ultimate-guitar.com/${indexLetter}/${artistName}/${tabTitle}_tab.htm`;
    let artistUrl = `https://tabs.ultimate-guitar.com/${artistName}_tabs.htm`;
    console.log("artistUrl", artistUrl);
    // var tab = {
    //   "artist_url": '',
    //   "chords_url": ''
    // };
    // tab.artist_url = artistUrl;
    // tab.chords_url = chordUrl;
    // tab.tab_url = tabUrl;
    // tab.artist_name = artist;
    // tab.song_title = title;
    // tab.album = data.data.metadata.music[0].album.name;
    // tab.spotify_track_id = data.data.metadata.music[0].spotify.track.id;
    // tab.youtube_video_id = data.data.metadata.music[0].youtube.vid;
    // console.log("overhere");
    // console.log("tab", JSON.stringify(tab));
    // console.log("tab artist_url", tab.artist_url);
      RootFactory.getApiRoot()
        .then(
          root =>
          console.log("heeeeeeeey");
          console.log("rooooooot", root);
            $http({
              url: `${root.tabs}`,
              method: 'POST',
              data: {
                "artist_url": artistUrl,
                "chords_url": chordUrl,
                "tab_url": tabUrl,
                "artist_name": artist,
                "song_title": title,
                "album": data.data.metadata.music[0].album.name,
                "spotify_track_id": data.data.metadata.music[0].spotify.track.id,
                "youtube_video_id": data.data.metadata.music[0].youtube.vid,

              },
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': "Token " + RootFactory.getToken()
              }
            })
            .then((res) => {
              $window.location.href = '#/results';
            });
    };
return {identify, postTab};
});
    // return new Promise ((resolve, reject) => {

    // });
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
