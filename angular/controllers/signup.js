app.controller('signup', ['$scope', '$location', 'Users',
  function($scope, $location, Users) {
    $scope.busy = false;

    var ok = function() {
      $location.path('/selling');
    };

    var fail = function(res) {
      $scope.error = res.data;
      $scope.busy = false;
    };

    $scope.signup = function(email, password) {
      $scope.busy = true;
      var details = {
        email: email,
        password: password
      };
      Users.save({}, details, ok, fail);
    };
  }
]);
