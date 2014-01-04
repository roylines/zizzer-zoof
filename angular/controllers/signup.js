app.controller('signup', ['$scope', '$location', 'Users',
  function($scope, $location, Users) {
    $scope.busy = false;
    $scope.center = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };

    $scope.markers = {
      main_marker: {
        lat: $scope.center.lat,
        lng: $scope.center.lng,
        focus: true,
        message: "Hey, drag me if you want",
        title: "Marker",
        draggable: true
      }
    };

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

    $scope.findLocation = function() {
      $scope.center = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13
      };

      $scope.markers.main_marker = {
        lat: $scope.center.lat,
        lng: $scope.center.lng,
        focus: true,
        message: "Please move me if I'm wrong",
        title: "Marker",
        draggable: true
      };
    };

    function gotPosition(position) {
      $scope.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 13
      };

      $scope.markers = {
        main_marker: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          focus: true,
          message: "Please move me if I'm wrong",
          title: "Marker",
          draggable: true
        }
      };
    }

    navigator.geolocation.getCurrentPosition(gotPosition, function(err) {
      console.log(err);
    });
  }
]);
