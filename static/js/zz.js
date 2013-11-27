/*zizzer-zoof: Copyright (C) 2012-2013, Roy Lines, http://roylines.co.uk*/
var app = angular.module('app', ['ngRoute']);

/*
app.run(function($rootScope) {
  $(document).foundation();
});
*/

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

app.directive('fileInput', ['$parse',
  function($parse) {
    return {
      restrict: "EA",
      template: "<input class='hidden' type='file' name='image' accept='image/*' capture='camera' />",
      replace: true,
      link: function(scope, element, attrs) {
        var updateModel = function() {
            scope[attrs.onChange](element[0].files[0]);
        };

        scope.$watch('state', function(s) {
          if (scope.state == 'choose') {
            scope.state = 'choosing';
            element[0].click();
          }
        });

        element.bind('change', updateModel);
      }
    };
  }
]);

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
