app.controller('topbar', ['$scope', '$location', 'Logout',
  function($scope, $location, Logout) {
    $scope.logout = function() {
      Logout.query();
      $location.path('/login');
    };  
  }
]);
