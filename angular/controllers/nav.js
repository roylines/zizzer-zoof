app.controller('nav', ['$rootScope', '$scope', 'Users', 
  function($rootScope, $scope, Users) {
    $rootScope.me = Users.get({name : 'me'});
  }
]);
