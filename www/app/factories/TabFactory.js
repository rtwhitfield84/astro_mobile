"use strict";

astro.factory('TabStorage', ($http, $window, RootFactory) => {


let getSong = () => {
  console.log("getsong");
  return new Promise((resolve, reject) => {
    $http({
      url: "https://api-astro.herokuapp.com/tabs/",
      method: "GET",
      headers: {
        'Authorization': "Token " + RootFactory.getToken()
      }
    }).success((song) => {
      console.log("songggggssss", song);
      resolve(song);
    }).error((err) => {
      console.log("errrrrgs", err);
      reject(err);
    });
  });

};
return {getSong};
});
