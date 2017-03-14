"use strict";

astro.factory('AudioStorage', ($http) => {

let identify = (msg) => {
  console.log("msg", msg);
};
return {identify};
});
