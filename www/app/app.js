var astro = angular.module('astro', ['ionic'])
            .constant('apiUrl', "https://api-astro.herokuapp.com/api-token-auth/");

astro.config(function($stateProvider,$urlRouterProvider) {


  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'UserCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'UserCtrl'
  })
  .state('call', {
    url: '/call',
    templateUrl: 'templates/call.html',
    controller: 'CallCtrl'
  })
  .state('fetch', {
    url: '/fetch',
    templateUrl: 'templates/fetch.html'
  })
  .state('results', {
    url: '/results',
    templateUrl: 'templates/results.html',
    controller: 'CallCtrl'
  })
  .state('fail', {
    url: '/fail',
    templateUrl: 'templates/fail.html',
    controller: 'FailCtrl'
  });

$urlRouterProvider.otherwise('/');
});

astro.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);


      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
});
