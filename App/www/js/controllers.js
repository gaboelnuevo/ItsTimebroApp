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

.controller('AlarmDetailCtrl', function($scope, $stateParams, $location, Alarms) {
  $scope.alarm = Alarms.get($stateParams.alarmId);
  $scope.WakeUp =function() {
    $location.path("/record");
  }
})

.controller('RecordCtrl', function($scope, $stateParams,$ionicPlatform, $cordovaCapture, Alarms) {
  $scope.captureAudio = function() {
    var options = { limit: 1, duration: 15 };
    var server = "";
    if (typeof(navigator.device) != "undefined"){
        $ionicPlatform.ready(function() {
          $cordovaCapture.captureAudio(options).then(function(audioData) {
            // Success! Audio data is here
            //alert(audioData);
            //alert(typeof(audioData));
            var i, path, len;
            for (i = 0, len = audioData.length; i < len; i += 1) {
              path = audioData[i].fullPath;
              /*$cordovaFileTransfer.upload(server, path, {})
                .then(function(result) {
                  // Success!
                }, function(err) {
                  // Error
                }, function (progress) {
                  // constant progress updates
              });*/
              alert(path);
              // do something interesting with the file
            }
            $scope.data = audioData;
          }, function(err) {
            alert("ocurrio un error");
            alert(err);
            // An error occurred. Show a message to the user
          });
        });
    }else{
      alert("your device is not supported");
    }
  }
})

.controller('LoginCtrl', function($scope, $location, $ionicPopup) {
    $scope.login = function() {
        if(this.username === "gabo" && this.password === "gabo"){
          console.log("LOGIN user: " + this.username + " - PW: " + this.password);
          $location.path("/tab/dash");
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
