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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
