/*zizzer-zoof: Copyright (C) 2012-2013, Roy Lines, http://roylines.co.uk*/
var app = angular.module('app', ['ngRoute', 'services']);
var services = angular.module('services', ['ngResource']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    var partial = function(name) {
      return {
        templateUrl: '/partial/' + name,
        controller: name
      };
    };
    $routeProvider.when('/selling', partial('selling'));
    //$routeProvider.when('/finding', partial('finding'));
    $routeProvider.otherwise({
      redirectTo: '/selling'
    });
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
