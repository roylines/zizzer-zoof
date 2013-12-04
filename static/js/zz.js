/*zizzer-zoof: Copyright (C) 2012-2013, Roy Lines, http://roylines.co.uk*/
var app = angular.module('app', ['ngRoute', 'services']);
var services = angular.module('services', ['ngResource']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    var routes = ['login', 'selling'];
    for (var i = 0; i < routes.length; ++i) {
      var template = {
        templateUrl: '/partial/' + routes[i],
        controller: routes[i]
      };
      $routeProvider.when('/' + routes[i], template);
    }

    $routeProvider.otherwise({
      redirectTo: '/login'
    });

    var interceptor = ['$q',
      function($q) {
        function success(response) {
          return response;
        }

        function error(response) {
          var status = response.status;

          if (status == 401) {
            console.log('401 HERE!');
            window.location = "/login";
            return;
          }
        }

        return function(promise) {
          return promise.then(success, error);
        }
      }
    ];

    $httpProvider.responseInterceptors.push(interceptor);
  }
]);

services.factory('Items', ['$resource',
  function($resource) {
    return $resource('/api/1/items/:id');
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

app.controller('login', ['$scope',
  function($scope) {
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
