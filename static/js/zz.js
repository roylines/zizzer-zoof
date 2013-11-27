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

app.controller('selling', ['$scope',
  function($scope) {
    $scope.contentClass = 'content active';
  }
]);