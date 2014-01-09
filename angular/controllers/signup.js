app.controller('signup', ['$scope', '$location', 'Users',
  function($scope, $location, Users) {
    $scope.center = {
      lat: -34.397,
      lng:150.644
    };
    $scope.zoom = 14;
    
    var ok = function() {
      $location.path('/selling');
    };

    var fail = function(res) {
      $scope.error = res.data;
      $scope.busy = false;
    };

    var searchResults = function(results, status) {
      $scope.$apply(function() {
        $scope.busy = false;
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results);
          $scope.center = {
            lat: results[0].geometry.location.b,
            lng: results[0].geometry.location.d
          };
          $scope.formatted_address = results[0].formatted_address;
        } else {
          $scope.error = status;
        }
      });
    };

    $scope.search = function(search) {
      $scope.busy = true;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': search
      }, searchResults);
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
