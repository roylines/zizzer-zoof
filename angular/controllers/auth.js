app.controller('auth', ['$scope', 'Users', 
  function($scope, Users) {
    $scope.me = Users.get({name : 'me'});
  }
]);
