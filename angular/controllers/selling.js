app.controller('selling', ['$scope',
  function($scope) {
    $scope.state = 'idle';

    $scope.choose = function() {
      $scope.state = 'choose';
    };

    $scope.readFile = function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        $scope.$apply(function() {
          $scope.newImage = reader.result;
          $scope.state = 'adding';
        });
      };
      reader.readAsDataURL(file);
    };
  }
]);
