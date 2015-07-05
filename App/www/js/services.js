angular.module('starter.services', [])

.factory('Alarms', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  //var alarms = [];
  /*return {
    all: function() {
      $http({
          method: 'GET',
          url: 'http://localhost:3000/alarmas.json',
          //params: 'limit=10, sort_by=created:desc',
       }).success(function(data){
         alarms = data.alarmas;
         alert(data);
      }).error(function(){
          alert("error");
      });
      return alarms;
    },
    remove: function(alarm) {
      alarms.splice(alarms.indexOf(alarm), 1);
    },
    get: function(alarmId) {
      for (var i = 0; i < alarms.length; i++) {
        if (alarms[i].id === parseInt(alarmId)) {
          return alarms[i];
        }
      }
      return null;
    }
  };*/

    // Some fake testing data
  var alarms = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'I have a interview tomorrow',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam',
    lastText: 'Wake up me.. please',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry',
    lastText: 'Hello world',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike',
    lastText: 'This is testing',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return alarms;
    },
    remove: function(alarm) {
      alarms.splice(alarms.indexOf(alarm), 1);
    },
    get: function(alarmId) {
      for (var i = 0; i < alarms.length; i++) {
        if (alarms[i].id === parseInt(alarmId)) {
          return alarms[i];
        }
      }
      return null;
    }
  };
});
