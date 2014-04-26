app.controller('settings', ['$scope',
  function($scope) {
    $scope.setLocation = function(where) {
      console.log('setting location', where);
    };
  }
]);
