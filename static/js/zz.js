/* zizzer-zoof: Roy Lines, http://roylines.co.uk */

var app = angular.module('app', ['ngRoute', 'services']);
var services = angular.module('services', ['ngResource']);

$('.ui.dropdown').dropdown();

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    var routes = ['settings'];
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

services.factory('Items', ['$resource',
  function($resource) {
    return $resource('/api/1/items/:id');
  }
]);

services.factory('Users', ['$resource',
  function($resource) {
    return $resource('/api/1/users/:name');
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

app.directive('mainFooter', [
  function() {
    return {
      restrict: 'E',
      templateUrl: "/partial/footer",
      replace: true
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

app.controller('auth', ['$scope', 'Users', 
  function($scope, Users) {
    $scope.me = Users.get({name : 'me'});
  }
]);

app.controller('landing', ['$scope',
  function($scope) {
    if ($scope.me) {
      $scope.nearby = [{
          title: 'Double divan bed for sale with 4 integrated drawers.',
          image: 'http://ecx.images-amazon.com/images/I/71wnFFuhBOL._SL1500_.jpg',
          price: 10.00,
          status: 'available',
          expires: new Date().getTime() + 200000,
          location: 'Didcot',
          distance: '20 miles'
        }, {
          title: 'Pine coffee table.',
          image:'http://ecx.images-amazon.com/images/I/41xAa7NzeiL.jpg', 
          price: 10.00,
          status: 'available',
          expires: new Date().getTime() + 200000,
          location: 'Didcot',
          distance: '20 miles'
        }, {
          title: 'Oak effect dining room table and benches. Table 121x75cm. Benches 88x34x81height cm',
          image:'http://ecx.images-amazon.com/images/I/31O2LZoXZ0L.jpg', 
          price: 10.00,
          status: 'offers',
          expires: new Date().getTime() + 200000,
          location: 'Didcot',
          distance: '20 miles'
        }
      ];
    }
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

app.controller('settings', ['$scope',
  function($scope) {

    var input = document.getElementById('searchTextField');
    var options = {
      types: [],
      componentRestrictions: {
        country: 'uk'
      }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      $scope.place = autocomplete.getPlace();
    });

    $scope.setLocation = function(where) {
      console.log('setting location', where);
    };
  }
]);
