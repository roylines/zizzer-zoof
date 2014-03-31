/* zizzer-zoof: Roy Lines, http://roylines.co.uk */

var app = angular.module('app', ['ngRoute', 'services']);
var services = angular.module('services', ['ngResource']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    var routes = ['login', 'selling', 'signup'];
    for (var i = 0; i < routes.length; ++i) {
      var template = {
        title: 'Zizzer-Zoof: ' + routes[i],
        templateUrl: '/partial/' + routes[i],
        controller: routes[i]
      };
      $routeProvider.when('/' + routes[i], template);
    }

    $routeProvider.otherwise({
      title: 'Zizzer-Zoof',
      templateUrl: '/partial/landing',
      controller: 'landing'
    });

    var interceptor = ['$q',
      function($q) {
        function success(response) {
          return response;
        }

        function error(response) {
          var status = response.status;

          if (status == 401) {
            window.location = "/";
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

app.run(['$location', '$rootScope',
  function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      $rootScope.title = current.title;
    });
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

app.directive('map', [
  function() {
    return {
      restrict: "EA",
      template: "<div class='map'></div>",
      replace: true,
      link: function(scope, element, attrs) {

        var map;
        var centerChanged = function() {
          if (scope.center === undefined) {
            return;
          }

          var center = new google.maps.LatLng(scope.center.lat, scope.center.lng);

          if (map) {
            map.setCenter(center);
          } else {
            var options = {
              zoom: 15,
              center: center
            };
            map = new google.maps.Map(element[0], options);
          }
        };

        scope.$watch('center', centerChanged, true);
      }
    };
  }
]);

app.directive('mainNavigation', [
  function() {
    return {
      restrict: 'E',
      templateUrl: "/partial/nav",
      replace: true
    };
  }
]);

app.controller('landing', ['$scope',
  function($scope) {
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

app.controller('topbar', ['$scope', '$location', 'Logout',
  function($scope, $location, Logout) {
    $scope.logout = function() {
      Logout.query();
      $location.path('/login');
    };  
  }
]);
