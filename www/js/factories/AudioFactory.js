"use strict";

astro.factory('AudioStorage', ($http) => {

let identify = (buffer) => {
  console.log("buffer", buffer);
  console.log("bufatob: ", atob(buffer));
  return new Promise ((resolve, reject) => {
    $http({
      url:"http://www.methegalaxy.com:3000/", //3000?example
      method: "POST",
      data: {
        audio: "buffer"
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
};
return {identify};
});
