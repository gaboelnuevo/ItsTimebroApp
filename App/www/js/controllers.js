angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AlarmsCtrl', function($scope, $ionicModal, Alarms) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.alarms = Alarms.all();
    $ionicModal.fromTemplateUrl('templates/modal-newalarm.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
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
            //alert("ocurrio un error");
            //alert(err);
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

.controller('AppController', function($scope, $state, $rootScope, $ionicHistory, $stateParams) {
    if ($stateParams.clear) {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
    }

    $scope.logout = function() {
        Parse.User.logOut();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;
        $state.go('welcome', {
            clear: true
        });
    };
})

.controller('WelcomeController', function($scope, $state, $rootScope, $ionicHistory, $stateParams) {
    if ($stateParams.clear) {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
    }

    $scope.login = function() {
        $state.go('app.login');
    };

    $scope.signUp = function() {
        $state.go('app.register');
    };

    if ($rootScope.isLoggedIn) {
        $state.go('tab.dash');
    }
})

.controller('HomeController', function($scope, $state, $rootScope) {

    if (!$rootScope.isLoggedIn) {
        $state.go('tab.dash');
    }
})

.controller('LoginController', function($scope, $state, $rootScope, $ionicLoading) {
    $scope.user = {
        username: null,
        password: null
    };

    $scope.error = {};

    $scope.login = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Logging in',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        var user = $scope.user;
        Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
            success: function(user) {
                $ionicLoading.hide();
                $rootScope.user = user;
                $rootScope.isLoggedIn = true;
                /*$state.go('app.home', {
                    clear: true
                });*/
                $state.go('tab.dash');
            },
            error: function(user, err) {
                $ionicLoading.hide();
                // The login failed. Check error to see why.
                if (err.code === 101) {
                    $scope.error.message = 'Invalid login credentials';
                } else {
                    $scope.error.message = 'An unexpected error has ' +
                        'occurred, please try again.';
                }
                $scope.$apply();
            }
        });
    };

    $scope.forgot = function() {
        $state.go('app.forgot');
    };
})

.controller('ForgotPasswordController', function($scope, $state, $ionicLoading) {
    $scope.user = {};
    $scope.error = {};
    $scope.state = {
        success: false
    };

    $scope.reset = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Sending',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        Parse.User.requestPasswordReset($scope.user.email, {
            success: function() {
                // TODO: show success
                $ionicLoading.hide();
                $scope.state.success = true;
                $scope.$apply();
            },
            error: function(err) {
                $ionicLoading.hide();
                if (err.code === 125) {
                    $scope.error.message = 'Email address does not exist';
                } else {
                    $scope.error.message = 'An unknown error has occurred, ' +
                        'please try again';
                }
                $scope.$apply();
            }
        });
    };

    $scope.login = function() {
        $state.go('app.login');
    };
})

.controller('RegisterController', function($scope, $state, $ionicLoading, $rootScope) {
    $scope.user = {};
    $scope.error = {};

    $scope.register = function() {

        // TODO: add age verification step

        $scope.loading = $ionicLoading.show({
            content: 'Sending',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        var user = new Parse.User();
        user.set("username", $scope.user.email);
        user.set("password", $scope.user.password);
        user.set("email", $scope.user.email);

        user.signUp(null, {
            success: function(user) {
                $ionicLoading.hide();
                $rootScope.user = user;
                $rootScope.isLoggedIn = true;
                $state.go('app.home', {
                    clear: true
                });
            },
            error: function(user, error) {
                $ionicLoading.hide();
                if (error.code === 125) {
                    $scope.error.message = 'Please specify a valid email ' +
                        'address';
                } else if (error.code === 202) {
                    $scope.error.message = 'The email address is already ' +
                        'registered';
                } else {
                    $scope.error.message = error.message;
                }
                $scope.$apply();
            }
        });
    };
})

.controller('TabController', function($scope, $state, $rootScope, $stateParams, $ionicHistory, $ionicModal){
  $ionicModal.fromTemplateUrl('/templates/modal-newalarm.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
})

.controller('MainController', function($scope, $state, $rootScope, $stateParams, $ionicHistory, $ionicModal) {
    if ($stateParams.clear) {
        $ionicHistory.clearHistory();
    }

    $scope.rightButtons = [{
        type: 'button-positive',
        content: '<i class="icon ion-navicon"></i>',
        tap: function(e) {
            $scope.sideMenuController.toggleRight();
        }
    }];

    $scope.logout = function() {
        Parse.User.logOut();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;
        $state.go('welcome', {
            clear: true
        });
    };

    $scope.toggleMenu = function() {
        $scope.sideMenuController.toggleRight();
    };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
