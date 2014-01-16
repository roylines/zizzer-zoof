app.controller('signup', ['$scope', '$location', 'Users',
  function($scope, $location, Users) {
    var ok = function() {
      $location.path('/selling');
    };

    var fail = function(res) {
      $scope.error = res.data;
      $scope.formatted_address = null;
      $scope.busy = false;
    };

    var searchResults = function(results, status) {
      $scope.$apply(function() {
        $scope.busy = false;
        if (status == google.maps.GeocoderStatus.OK) {
          if(results.length !== 1) {
            $scope.error = 'too many locations, please be more specific';
            return;
          }
          console.log(results);
          $scope.center = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
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

    $scope.signup = function() {
      $scope.busy = true;

      var details = {
        email: $scope.email,
        password: $scope.password,
        geo: [$scope.center.lng, $scope.center.lat] 
      };

      Users.save({}, details, ok, fail);
    };
  }
]);
