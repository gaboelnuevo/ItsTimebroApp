angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AlarmsCtrl', function($scope, Alarms) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.alarms = Alarms.all();
  $scope.remove = function(alarm) {
    Alarms.remove(alarm);
  }
})

.controller('AlarmDetailCtrl', function($scope, $stateParams, Alarms) {
  $scope.alarm = Alarms.get($stateParams.alarmId);
})

.controller('LoginCtrl', function($scope, $location, $ionicPopup) {
    $scope.login = function() {
        if(this.username === "gabo" && this.password === "gabo"){
          console.log("LOGIN user: " + this.username + " - PW: " + this.password);
          $location.path("/dash");
        }else{
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'User or password incorrect'
              });
            alertPopup.then(function(res) {
              console.log('Login Failed');
            });
        }
    }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
