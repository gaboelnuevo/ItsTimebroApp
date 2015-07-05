angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $state, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
          Parse.initialize('fBkPHBO4BQ7UleGXsIglANaT7AazVPycm50n9PfC', 'IeT8uxy2Q5sBa0cfBtlodGCEXITU9CmfIioAhKRZ');
        var currentUser = Parse.User.current();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;

        if (currentUser) {
            $rootScope.user = currentUser;
            $rootScope.isLoggedIn = true;
            $state.go('app.home');
        }
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  /*.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })*/

  .state('voicenote', {
    url: '/voicenote',
    templateUrl: 'templates/voicenote.html'
  })

  .state('recording', {
    url: '/record',
    templateUrl: 'templates/record.html',
    controller: 'RecordCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.alarms', {
    url: '/alarms',
    views: {
      'tab-alarms': {
        templateUrl: 'templates/tab-alarms.html',
        controller: 'AlarmsCtrl'
      }
    }
  })
  .state('tab.alarm-detail', {
    url: '/alarms/:alarmId',
    views: {
      'tab-alarms': {
        templateUrl: 'templates/alarm-detail.html',
        controller: 'AlarmDetailCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('welcome', {
    url: '/welcome?clear',
    templateUrl: 'templates/welcome.html',
    controller: 'WelcomeController'
  })

  .state('app', {
    url: '/app?clear',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppController'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      }
    }
  })

  .state('app.forgot', {
    url: '/forgot',
    views: {
      'menuContent': {
        templateUrl: 'templates/forgotPassword.html',
        controller: 'ForgotPasswordController'
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
      }
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');

  

});
