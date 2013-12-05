app.controller('login', ['$scope', '$location', 'Login',
  function($scope, $location, Login) {
    $scope.busy = false;

    var ok = function() {
      $location.path('/selling');
    };

    var fail = function(res) {
      $scope.error = res.data;
      $scope.busy = false;
    };

    $scope.login = function(username, password) {
      $scope.busy = true;
      var details = {
        username: username,
        password: password
      };
      Login.save({}, details, ok, fail);
    };
  }
]);
