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
