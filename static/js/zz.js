/*zizzer-zoof: Copyright (C) 2012-2013, Roy Lines, http://roylines.co.uk*/
var app = angular.module('app', ['ngRoute', 'services', 'leaflet-directive']);
var services = angular.module('services', ['ngResource']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    var routes = ['login', 'selling', 'signup'];
    for (var i = 0; i < routes.length; ++i) {
      var template = {
        templateUrl: '/partial/' + routes[i],
        controller: routes[i]
      };
      $routeProvider.when('/' + routes[i], template);
    }

    $routeProvider.otherwise({
      redirectTo: '/signup'
    });

    var interceptor = ['$q',
      function($q) {
        function success(response) {
          return response;
        }

        function error(response) {
          var status = response.status;

          if (status == 401) {
            window.location = "/signup";
            return;
          }

          return $q.reject(response);
        }

        return function(promise) {
          return promise.then(success, error);
        };
      }
    ];

    $httpProvider.responseInterceptors.push(interceptor);
  }
]);

services.factory('Login', ['$resource',
  function($resource) {
    return $resource('/api/1/login');
  }
]);

services.factory('Logout', ['$resource',
  function($resource) {
    return $resource('/api/1/logout');
  }
]);

services.factory('Items', ['$resource',
  function($resource) {
    return $resource('/api/1/items/:id');
  }
]);

services.factory('Users', ['$resource',
  function($resource) {
    return $resource('/api/1/users');
  }
]);

app.directive('fileInput', ['$parse',
  function($parse) {
    return {
      restrict: "EA",
      template: "<input class='hidden' type='file' name='image' accept='image/*' capture='camera' />",
      replace: true,
      link: function(scope, element, attrs) {

        scope.$watch('state', function(s) {
          if (scope.state == 'choose') {
            scope.state = 'choosing';
            element[0].click();
          }
        });

        element.bind('change', function(evt) {
          scope[attrs.onChange](evt.target.files[0]);
        });
      }
    };
  }
]);

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

    $scope.login = function(email, password) {
      $scope.busy = true;
      var details = {
        email: email,
        password: password
      };
      Login.save({}, details, ok, fail);
    };
  }
]);

app.controller('selling', ['$scope', 'Items',
  function($scope, Items) {
    $scope.state = 'idle';

    $scope.choose = function() {
      $scope.state = 'choose';
    };

    $scope.chosen = function(file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        $scope.$apply(function() {
          $scope.newImage = reader.result;
          $scope.state = 'chosen';
        });
      };
      reader.readAsDataURL(file);
    };

    $scope.forSale = Items.query({ status: 'selling' });
  }
]);

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

app.controller('topbar', ['$scope', '$location', 'Logout',
  function($scope, $location, Logout) {
    $scope.logout = function() {
      Logout.query();
      $location.path('/login');
    };  
  }
]);
